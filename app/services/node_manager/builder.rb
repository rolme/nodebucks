module NodeManager
  class Builder
    attr_accessor :node
    attr_reader :crypto, :error, :user

    def initialize(user, crypto, cost)
      @crypto = crypto
      @user   = user
      @node   = Node.new(
        user_id: user.id,
        crypto_id: crypto.id,
        cost: cost.to_f
      )
    end

    def save(timestamp=DateTime.current)
      if node.save
        node.events.create(event_type: 'ops', description: 'Server setup', timestamp: timestamp)
        node
      else
        @error = @node.errors.full_messages.join(', ')
        false
      end
    end
  end
end
