module NodeManager
  class Operator
    attr_reader :error, :node, :order

    def initialize(node)
      @node = node
    end

    def reward(timestamp, amount, txhash)
      return false unless (node.crypto.block_reward - amount).abs <= 1.0

      fee = amount * node.percentage_hosting_fee
      total_amount = amount - fee
      usd_value    = total_amount * node.crypto_price

      reward = Reward.create(
        amount: amount,
        fee: fee,
        node_id: node.id,
        timestamp: timestamp,
        total_amount: total_amount,
        txhash: txhash,
        usd_value: usd_value
      )

      create_reward_event(reward)
      tm = TransactionManager.new(node.account)
      tm.deposit_reward(reward)
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
      @order = Order.create(
        node_id: node.id,
        user_id: node.user_id,
        currency: 'usd',
        amount: node.cost,
        status: 'unpaid',
        order_type: 'buy',
        description: "#{node.user.email} purchased #{node.crypto.name} masternode for $#{node.cost}."
      )
      node.events.create(event_type: 'ops', timestamp: timestamp, description: "Server setup initiated")
      # TODO: Do we need to track setup fee here?
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
      # TODO: Make sure the sellable price is correct
      @order = Order.create(
        node_id: node.id,
        user_id: node.user_id,
        currency: 'usd',
        amount: node.cost,
        status: 'unpaid',
        order_type: 'sold',
        description: "#{node.user.email} sold #{node.crypto.name} masternode for $#{node.sellable_price}."
      )
      node.events.create(event_type: 'ops', timestamp: timestamp, description: "Server sold")
    end

  protected

     def within_timeframe?(datetime)
       return false if datetime.blank?
       DateTime.current < (datetime + Node::TIME_LIMIT)
     end

     def create_reward_event(reward)
       node.events.create(
         event_type: 'reward',
         timestamp: reward.timestamp,
         value: reward.total_amount,
         description: "Reward: #{reward.amount} #{node.symbol} (-#{reward.fee} fee)"
       )
     end
  end
end
