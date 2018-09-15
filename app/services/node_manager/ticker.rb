module NodeManager
  class Ticker
    attr_accessor :node

    DEBUG = false

    def initialize(node)
      @node = node
      @crypto = node.crypto
    end

    def evaluate
      return if node.stake.blank?
        node.node_prices.create(
          data: 'from crypto prices table',
          source: node.ticker_url,
          value: node.stake * crypto.prices.find_by(amount: node.stake)
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
