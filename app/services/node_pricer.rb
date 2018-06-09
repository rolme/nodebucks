class NodePricer
  attr_reader :btc_usdt, :orders, :prices

  def self.run
    node_pricer = self.new
    node_pricer.price
  end

  def initialize
    @cryptopia = Api::Cryptopia.new
    @kucoin    = Api::Kucoin.new
    @btc_usdt  = [@cryptopia.btc_usdt, @kucoin.btc_usdt].reduce(&:+) / 2.0
  end

  def price(a_crypto=nil)
    cryptos = (a_crypto.present?) ? [a_crypto] : Crypto.all
    @prices = {}
    cryptos.each do |crypto|
      @prices[:cryptopia]  = @cryptopia.node_price(crypto.symbol, crypto.stake)
      @prices[:kucoin]     = @kucoin.node_price(crypto.symbol, crypto.stake)
      cryptopia_orders = tag_orders(@cryptopia.orders, 'cryptopia')
      kucoin_orders    = tag_orders(@kucoin.orders, 'kucoin')

      @orders = [
        cryptopia_orders,
        kucoin_orders
      ].flatten.sort_by { |order| order [:price] }

      @prices[:all] = node_price(@orders, crypto.stake)
    end
  end

  def btc_to_usdt(btc)
    btc * btc_usdt
  end

  def liquid?(orders, limit)
    orders.map{ |order| order[:volume] }.reduce(&:+) > limit.to_f
  end

private

  def tag_orders(orders, tag)
    orders.map do |order|
      order[:tag] = tag
      order
    end
  end

  # symbol - String
  # stake  - Integer
  # juice  - Float, default: 0.0
  # Return Float
  def node_price(orders, stake, juice=0.0)
    price    = purchasable_price(@orders, stake.to_f)
    price   += (price * juice)
    btc_to_usdt(price)
  end

  def purchasable_price(orders, limit)
    total  = 0
    i      = 0
    value  = 0
    while (orders.count > i && limit > total) do
      remaining_units = limit - total
      volume = (remaining_units <= orders[i][:volume]) ? remaining_units : orders[i][:volume]
      total += volume
      value += orders[i][:price] * volume
      i += 1
    end
    return value if liquid?(orders, limit)
    value + orders.last[:price] * (limit - total)
  end

end
