module NodeManager
  class Pricer < Api::Base
    attr_reader :avg_btc_usdt, :orders, :prices
    attr_accessor :persist

    def self.run
      node_pricer = self.new(persist: true)
      node_pricer.evaluate
      node_pricer = self.new(persist: true, type: 'buy')
      node_pricer.evaluate
    end

    # type: sell - get sell order books for buying a masternode
    #       buy  - get buy order books for selling a masternode
    def initialize(options={})
      @persist      = !!options[:persist]
      @type         = (options[:type].present?) ? options[:type] : 'sell'
      @orders       = []
      @prices       = {}
      @binance      = Api::Binance.new(@type)
      @bittrex      = Api::Bittrex.new(@type)
      @cryptopia    = Api::Cryptopia.new(@type)
      @kucoin       = Api::Kucoin.new(@type)
      @poloniex     = Api::Poloniex.new(@type)
      @avg_btc_usdt = [
        @binance.btc_usdt,
        @bittrex.btc_usdt,
        @cryptopia.btc_usdt,
        @kucoin.btc_usdt,
        @poloniex.btc_usdt
      ].reduce(&:+) / 5.0
    end

    def evaluate(a_crypto=nil)
      cryptos = (a_crypto.present?) ? [a_crypto] : Crypto.active

      cryptos.each do |crypto|
        @orders = gather_orders(crypto)
        @prices[crypto.symbol] = {
          all: available_price(@orders, crypto.stake),
          binance: available_price(@orders, crypto.stake, Api::Binance::EXCHANGE),
          bittrex: available_price(@orders, crypto.stake, Api::Bittrex::EXCHANGE),
          cryptopia: available_price(@orders, crypto.stake, Api::Cryptopia::EXCHANGE),
          kucoin: available_price(@orders, crypto.stake, Api::Kucoin::EXCHANGE),
          poloniex: available_price(@orders, crypto.stake, Api::Poloniex::EXCHANGE)
        }
        if (@type == 'sell')
          purchasing_price = @prices[crypto.symbol][:all]
          coin_price       = purchasing_price / crypto.stake
          crypto.update_attributes(
            node_price: calculate_price(crypto, purchasing_price),
            price: coin_price,
            purchasable_price: purchasing_price
          ) if !!persist
        else
          CryptoPricer.price(@orders, crypto, @avg_btc_usdt)
          selling_price = @prices[crypto.symbol][:all]
          crypto.update_attribute(:sellable_price, selling_price) if !!persist
        end
      end
      @prices
    end

    # TOOD: Get what value we can for the amount passed in.
    def to_btc(crypto, amount)
      @orders = gather_orders(crypto)
      Rails.logger.info ">>>>> gathering orders #{orders.inspect}"
      btc_order_price(@orders, amount)
    end

  private

    def gather_orders(crypto)
      orders = []
      orders << @binance.orders(crypto.symbol)
      orders << @bittrex.orders(crypto.symbol)
      orders << @cryptopia.orders(crypto.symbol)
      orders << @kucoin.orders(crypto.symbol)
      orders << @poloniex.orders(crypto.symbol)

      orders = orders.flatten.sort_by { |order| order[:price] }
      orders = orders.reverse! if @type == 'buy'
      orders
    end

    # symbol   - String
    # stake    - Integer
    # exchange - String
    # Return Float
    def available_price(my_orders, stake, exchange=nil)
      filtered_orders = (exchange.present?) ? my_orders.select {|o| o[:exchange] == exchange } : my_orders
      return 0.0 if filtered_orders.empty?

      price = btc_order_price(filtered_orders, stake.to_f)
      price * avg_btc_usdt
    end

    def calculate_price(crypto, purchasing_price=nil)
      purchasing_price ||= crypto.purchasable_price
      setup_cost         = (purchasing_price * crypto.percentage_setup_fee) + crypto.flat_setup_fee
      conversion_cost    = purchasing_price * crypto.percentage_conversion_fee

      purchasing_price + setup_cost + conversion_cost
    end
  end
end
