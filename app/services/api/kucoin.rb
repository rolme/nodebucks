module Api
  class Kucoin
    DEBUG    = false
    BASE_URI = "https://api.kucoin.com"

    if Rails.env == 'development'
      API_KEY    = Rails.application.credentials.kucoin[:api_key]
      API_SECRET = Rails.application.credentials.kucoin[:secret]
    else
      API_KEY    = ENV['KUCOIN_API_KEY']
      API_SECRET = ENV['KUCOIN_API_KEY']
    end

    attr_reader :btc_usdt, :orders, :path

    def self.nonce
      DateTime.current.to_i
    end

    def initialize
      nonce     = Api::Kucoin.nonce
      params    = "limit=100&symbol=BTC-USDT"
      end_point = "/v1/open/orders-sell"
      response = Typhoeus::Request.get("#{BASE_URI}#{end_point}?#{params}", headers: {
        'Content-Type' => 'application/json',
        'KC-API-KEY' => API_KEY,
        'KC-API-NONCE' => nonce,
        'KC-API-SIGNATURE' => signature(end_point, nonce, params)
      }, verbose: DEBUG)
      orders    = (response.body['success']) ? to_orders(parsed_response(response.body)['data']) : []
      @btc_usdt = purchasable_price(orders, 1.0)
    end

    def sell_orders(symbol)
      nonce     = Api::Kucoin.nonce
      params    = "limit=100&symbol=#{symbol.upcase}-BTC"
      end_point = "/v1/open/orders-sell"
      response = Typhoeus::Request.get("#{BASE_URI}#{end_point}?#{params}", headers: {
        'Content-Type' => 'application/json',
        'KC-API-KEY' => API_KEY,
        'KC-API-NONCE' => nonce,
        'KC-API-SIGNATURE' => signature(end_point, nonce, params)
      }, verbose: DEBUG)
      @orders = (response.body['success']) ? to_orders(parsed_response(response.body)['data']) : []
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


    def signature(end_point, nonce, params=nil)
      encoded = Base64.strict_encode64("#{end_point}/#{nonce}/#{params}")
      OpenSSL::HMAC.hexdigest(OpenSSL::Digest.new('sha256'), API_SECRET, encoded)
    end

    # Returns Array of Hash [{ price: float, volume: float }, ...]
    def to_orders(orders)
      id = 0
      orders.map do |order|
        {
          id: id += 1,
          price: order[0].to_f,
          volume: order[1].to_f
        }
      end
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

    def parsed_response(response)
      begin
        JSON.parse(response)
      rescue JSON::ParserError => e
        { error: e.to_s }
      end
    end

  end
end
