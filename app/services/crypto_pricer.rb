class CryptoPricer
  attr_reader :crypto, :orders
  AMOUNTS = [1, 10, 25, 50, 100, 250, 500, 1000, 2500, 5000, 10000]

  def initialize(crypto, orders=[])
    @crypto = crypto
    @orders = orders
  end

  def buy_price(btc_usdt)
    AMOUNTS.each do |amount|
      value = btc_order_price(amount)
      CryptoPrice.find_by(crypto_id: crypto.id, amount: amount, price_type: 'buy').update(
        btc: value,
        usdt: value * btc_usdt,
      )
    end
  end

  def sell_price(btc_usdt)
    AMOUNTS.each do |amount|
      value = btc_order_price(amount, 'sell')
      CryptoPrice.find_by(crypto_id: crypto.id, amount: amount, price_type: 'sell').update(
        btc: value,
        usdt: value * btc_usdt,
      )
    end
  end

  def to_btc(total, type='buy')
    return 0 if total <= 0

    case
    when total >= 10000; amount = 10000
    when total >= 5000; amount = 5000
    when total >= 2500; amount = 2500
    when total >= 1000; amount = 1000
    when total >= 500; amount = 500
    when total >= 250; amount = 250
    when total >= 100; amount = 100
    when total >= 50; amount = 50
    when total >= 25; amount = 25
    when total >= 10; amount = 10
    else amount = 1
    end

    CryptoPrice.find_by(crypto_id: crypto.id, amount: amount, price_type: type).btc * total
  end

  def to_usdt(total, type='buy')
    return 0 if total <= 0

    case
    when total >= 10000; amount = 10000
    when total >= 5000; amount = 5000
    when total >= 2500; amount = 2500
    when total >= 1000; amount = 1000
    when total >= 500; amount = 500
    when total >= 250; amount = 250
    when total >= 100; amount = 100
    when total >= 50; amount = 50
    when total >= 25; amount = 25
    when total >= 10; amount = 10
    else amount = 1
    end

    CryptoPrice.find_by(crypto_id: crypto.id, amount: amount, price_type: type).usdt * total
  end

  # Privatish
  def btc_order_price(required_volume, type='buy')
    return 0.0 if orders.count == 0
    current_volume  = 0
    value           = 0
    reserved_value  = 0

    # Determine if we need to reserve any orders
    if type == 'buy'
      required_reserve = crypto.nodes.select{ |n| n.status == 'new' }.count * crypto.stake
    else
      required_reserve = crypto.nodes.select{ |n| n.status == 'sold' }.count * crypto.stake
    end
    current_reserve  = 0

    i = 0
    while (orders.count > i && required_volume > current_volume) do
      # Check to see if there is reserved volume
      # if there is start reserving until it is filled
      if required_reserve > 0 && required_reserve > current_reserve
        current_reserve += orders[i][:volume]
        reserved_value  += orders[i][:price] * orders[i][:volume]
      else
        current_volume += orders[i][:volume]
        value          += orders[i][:price] * orders[i][:volume]
      end
      i += 1
    end

    value += (current_volume >= required_volume) ? 0 : orders.last[:price] * (required_volume - current_volume)
    value / current_volume
  end
end
