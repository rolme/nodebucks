module Api
  class Coinigy
    # TODO: Move this into
    BASE_URI    = "https://api.coinigy.com/api/v2"
    API_KEY     = "ea80901eba09b1197cbd500bba06af86"
    API_SECRET  = "e6f836c6a63cd8ea94853c1918566993"
    API_CHANNEL = "BF0EC6C2-8FCF-68BD-CBDB-D838D22892BB"

    def coins
      return @coins if @coins.present?

      response = Typhoeus::Request.get("#{BASE_URI}/public/chains")
      @coins = (response.body['success']) ? parsed_response(response.body)['result'] : []
      @coins
    end

    def exchanges
      return @exchanges if @exchanges.present?

      response = Typhoeus::Request.get("#{BASE_URI}/private/exchanges", headers: {
        'Content-Type' => 'application/json',
        'X-API-KEY' => API_KEY,
        'X-API-SECRET' => API_SECRET
      }, verbose: true)
      @exchanges = (response.body['success']) ? parsed_response(response.body)['result'] : []
      @exchanges
    end

    def markets
      return @markets if @markets.present?

      response = Typhoeus::Request.get("#{BASE_URI}/public/markets/extract")
      @markets = (response.body['success']) ? parsed_response(response.body)['result'] : []
      @markets
    end

    def exchange_markets(exchangeCode)
      response = Typhoeus::Request.get("#{BASE_URI}/public/exchanges/#{exchangeCode}/markets")
      (response.body['success']) ? parsed_response(response.body)['result'] : []
    end

    def market_pricing(market_id)
      response = Typhoeus::Request.get(
        "#{BASE_URI}/public/markets/extract/pricing",
        params: {
          StartDate: Date.current - 1.day,
          EndDate: Date.current,
          MarketId: market_id
        }
      )
      (response.body['success']) ? parsed_response(response.body)['result'] : []
    end

  private
    def parsed_response(response)
      begin
        JSON.parse(response)
      rescue JSON::ParserError => e
        { error: e.to_s }
      end
    end
  end
end
