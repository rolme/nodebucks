class CryptoPricer
  AMOUNTS = [1, 10, 25, 50, 100, 250, 500, 1000, 2500, 5000, 10000]

  def self.buy_price(orders, crypto, btc_usdt)
    AMOUNTS.each do |amount|
      value = self.btc_order_price(orders, amount) / amount
      CryptoPrice.find_by(crypto_id: crypto.id, amount: amount, price_type: 'buy').update(
        btc: value,
        usdt: value * btc_usdt,
      )
    end
  end

  def self.sell_price(orders, crypto, btc_usdt)
    AMOUNTS.each do |amount|
      value = self.btc_order_price(orders, amount) / amount
      CryptoPrice.find_by(crypto_id: crypto.id, amount: amount, price_type: 'sell').update(
        btc: value,
        usdt: value * btc_usdt,
      )
    end
  end

  def self.to_btc(crypto_id, total, type='buy')
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

    CryptoPrice.find_by(crypto_id: crypto_id, amount: amount, price_type: type).btc * total
  end

  def self.to_usdt(crypto_id, total, type='buy')
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

    CryptoPrice.find_by(crypto_id: crypto_id, amount: amount, price_type: type).usdt * total
  end

  # Privatish
  def self.btc_order_price(orders, limit)
    return 0.0 if orders.count == 0
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
    return value if self.liquid?(orders, limit)
    value + orders.last[:price] * (limit - total)
  end

  # Privatish
  def self.liquid?(orders, limit)
    return false if orders.empty?
    orders.map{ |order| order[:volume] }.reduce(&:+) > limit.to_f
  end
end
