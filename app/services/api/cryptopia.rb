module Api
  class Cryptopia
    BASE_URI    = "https://www.cryptopia.co.nz/api"
    DEBUG       = false

    attr_reader :btc_usdt, :orders, :path

    def initialize
      response  = Typhoeus::Request.get("#{BASE_URI}/GetMarketOrders/BTC_USDT", verbose: DEBUG)
      data      = (response.body['Success']) ? parsed_response(response.body)['Data'] : []
      orders    = to_orders(data['Sell'])
      @btc_usdt = purchasable_price(orders, 1.0)
    end

    # symbol - String
    # stake  - Integer
    # juice  - Float, default: 0.0
    # Return Float
    def node_price(symbol, stake, juice=0.0)
      @orders  = sell_orders(symbol)
      price    = purchasable_price(@orders, stake.to_f)
      price   += (price * juice)
      btc_to_usdt(price)
    end

    def liquid?(orders, limit)
      orders.map{ |order| order[:volume] }.reduce(&:+) > limit.to_f
    end

    def btc_to_usdt(btc)
      btc * btc_usdt
    end

  private

    def parsed_response(response)
      begin
        JSON.parse(response)
      rescue JSON::ParserError => e
        { error: e.to_s }
      end
    end

    # Returns Array of Hash [{ price: float, volume: float }, ...]
    def to_orders(data)
      id = 0
      data.map{ |order| { id: id+=1, price: order['Price'].to_f, volume: order['Volume'].to_f } }
    end

    # orders - Array of Hash [{ price: float, volume: float }, ...]
    # limit  - Float
    # Returns Float
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

    def sell_orders(symbol)
      @path    = "#{BASE_URI}/GetMarketOrders/#{symbol.upcase}_BTC"
      response = Typhoeus::Request.get("#{BASE_URI}/GetMarketOrders/#{symbol.upcase}_BTC", verbose: DEBUG)
      data = (response.body['Success']) ? parsed_response(response.body)['Data'] : []
      to_orders(data['Sell'])
    end

  end
end
