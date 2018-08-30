class CryptoPricer
  AMOUNTS = [1, 10, 25, 50, 100, 250, 500, 1000, 2500, 5000, 10000]

  def self.price(orders, crypto, btc_usdt)
    AMOUNTS.each do |amount|
      value = self.btc_order_price(orders, amount) / amount
      CryptoPrice.find_by(crypto_id: crypto.id, amount: amount).update(usdt: value * btc_usdt)
    end
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
