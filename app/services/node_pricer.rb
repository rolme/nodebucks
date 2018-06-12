class NodePricer < Api::Base
  attr_reader :avg_btc_usdt, :orders, :prices
  attr_accessor :persist

  def self.run
    node_pricer = self.new(persist: true)
    node_pricer.evaluate
    node_pricer.prices
  end

  def initialize(options={})
    @persist      = !!options[:persist]
    @orders       = []
    @prices       = {}
    @binance      = Api::Binance.new
    @bittrex      = Api::Bittrex.new
    @cryptopia    = Api::Cryptopia.new
    @kucoin       = Api::Kucoin.new
    @poloniex     = Api::Poloniex.new
    @avg_btc_usdt = [
      @binance.btc_usdt,
      @bittrex.btc_usdt,
      @cryptopia.btc_usdt,
      @kucoin.btc_usdt,
      @poloniex.btc_usdt
    ].reduce(&:+) / 5.0
  end

  def evaluate(a_crypto=nil)
    cryptos = (a_crypto.present?) ? [a_crypto] : Crypto.all

    cryptos.each do |crypto|
      @orders = []
      @orders << @binance.orders(crypto.symbol)
      @orders << @bittrex.orders(crypto.symbol)
      @orders << @cryptopia.orders(crypto.symbol)
      @orders << @kucoin.orders(crypto.symbol)
      @orders << @poloniex.orders(crypto.symbol)

      @orders = @orders.flatten.sort_by { |order| order[:price] }
      @prices[crypto.symbol] = {
        all: node_price(@orders, crypto.stake),
        binance: node_price(@orders, crypto.stake, Api::Binance::EXCHANGE),
        bittrex: node_price(@orders, crypto.stake, Api::Bittrex::EXCHANGE),
        cryptopia: node_price(@orders, crypto.stake, Api::Cryptopia::EXCHANGE),
        kucoin: node_price(@orders, crypto.stake, Api::Kucoin::EXCHANGE),
        poloniex: node_price(@orders, crypto.stake, Api::Poloniex::EXCHANGE)
      }
      crypto.update_attribute(:purchasable_price, @prices[crypto.symbol][:all]) if !!persist
    end
    @prices
  end

private

  # symbol   - String
  # stake    - Integer
  # exchange - String
  # Return Float
  def node_price(my_orders, stake, exchange=nil)
    filtered_orders = (exchange.present?) ? my_orders.select {|o| o[:exchange] == exchange } : my_orders
    return 0.0 if filtered_orders.empty?

    price = purchasable_price(filtered_orders, stake.to_f)
    price * avg_btc_usdt
  end
end
