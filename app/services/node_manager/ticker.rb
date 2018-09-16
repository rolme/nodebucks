# Crypto.find_by(name: 'Dash').update_attribute(:ticker_url, 'https://api.coinmarketcap.com/v2/ticker/131/')
# Crypto.find_by(name: 'ZCoin').update_attribute(:ticker_url, 'https://api.coinmarketcap.com/v2/ticker/1414/')
# Crypto.find_by(name: 'Polis').update_attribute(:ticker_url, 'https://api.coinmarketcap.com/v2/ticker/2359/')
# Crypto.find_by(name: 'PIVX').update_attribute(:ticker_url, 'https://api.coinmarketcap.com/v2/ticker/1169/')
# Crypto.find_by(name: 'Stipend').update_attribute(:ticker_url, 'https://api.coinmarketcap.com/v2/ticker/2616/')


module NodeManager
  class Ticker
    attr_accessor :node

    DEBUG = false

    def initialize(node)
      @node = node
    end

    def evaluate
      return if node.stake.blank?
      response = Typhoeus::Request.get(node.ticker_url, timeout: 3, verbose: DEBUG)
      if !!response.body['data']
        data = parsed_response(response.body)['data']

        node.node_prices.create(
          data: data,
          source: node.ticker_url,
          value: node.stake * data["quotes"]["USD"]["price"].to_f
        )
      end
    end

    protected

    def parsed_response(response)
      begin
        JSON.parse(response)
      rescue JSON::ParserError => e
        { error: e.to_s }
      end
    end

  end
end
