module NodeManager
  class Operator
    attr_reader :error, :node

    def initialize(node)
      @node = node
    end

    # TODO: Make sure only reward transactions are stored.
    def reward(timestamp, amount, txhash)
      fee = amount * node.percentage_hosting_fee
      total_amount = amount - fee

      node.rewards.create(timestamp: timestamp, amount: amount, txhash: txhash, total_amount: total_amount)
      node.events.create(event_type: 'reward', timestamp: timestamp, value: total_amount, description: "Reward: #{amount} #{node.symbol} (-#{fee} fee)")
    end

    def online(timestamp=DateTime.current)
      return false if node.status == 'online'
      node.update_attributes(status: 'online', online_at: timestamp)
      node.events.create(event_type: 'ops', timestamp: timestamp, description: "Server online")
    end

    def offline(timestamp=DateTime.current)
      return false if node.status != 'online'
      node.update_attribute(:status, 'offline')
      node.events.create(event_type: 'ops', timestamp: timestamp, description: "Server offline for maintenance")
    end

    def purchase(timestamp=DateTime.current)
      return false if node.status != 'reserved' || !within_timeframe?(node.buy_priced_at)

      node.update_attribute(:status, 'new')
      node.node_prices.create(source: 'system', value: node.cost)
      node.events.create(event_type: 'ops', timestamp: timestamp, description: "Server setup initiated")
    end

    def reserve_sell_price(timestamp=DateTime.current)
      return false if node.status == 'sold'
      np = NodeManager::Pricer.new(persist: true, type: 'buy')
      np.evaluate(node.crypto)
      node.reload
      node.update_attributes(sell_price: node.value, sell_priced_at: DateTime.current)
    end

    def sell(timestamp=DateTime.current)
      return false if node.status == 'sold' || !within_timeframe?(node.sell_priced_at)

      node.update_attribute(:status, 'sold')
      node.events.create(event_type: 'ops', timestamp: timestamp, description: "Server sold")
    end

  protected

     def within_timeframe?(datetime)
       return false if datetime.blank?
       DateTime.current < (datetime + Node::TIME_LIMIT)
     end
  end
end
