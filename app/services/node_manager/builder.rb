module NodeManager
  class Builder
    attr_accessor :node
    attr_reader :crypto, :error, :user

    def initialize(user, crypto)
      @crypto   = crypto
      @user     = user
      @node     = Node.find_by(user_id: user.id, crypto_id: crypto.id, status: 'reserved')
      @node   ||= Node.new(
        user_id: user.id,
        crypto_id: crypto.id,
        cost: crypto.node_price,
        status: 'reserved',
        buy_priced_at: DateTime.current
      )
    end

    def latest_pricing
      np = NodeManager::Pricer.new(persist: true)
      np.evaluate(@crypto)
      @crypto.reload
    end

    def save(timestamp=DateTime.current)
      latest_pricing
      if node.id.present?
        node.reload
        node.update_attributes(
          cost: node.crypto.node_price,
          buy_priced_at: DateTime.current
        )
        return node
      end

      node.cost = crypto.node_price
      if node.save
        node.events.create(event_type: 'ops', description: 'Server price reserved', timestamp: timestamp)
        node
      else
        @error = @node.errors.full_messages.join(', ')
        false
      end
    end
  end
end
