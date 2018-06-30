module NodeManager
  class Operator
    attr_reader :error, :node

    def initialize(node)
      @node = node
    end

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
      return false if node.status != 'reserved'
      node.update_attribute(:status, 'new')
      node.events.create(event_type: 'ops', timestamp: timestamp, description: "Server setup initiated")
    end
  end
end
