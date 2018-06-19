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

    def save
      return node if node.save

      @error = @node.errors.full_messages.join(', ')
      false
    end
  end
end
