class AccountManager
  attr_accessor :user

  def initialize(user)
    @user = user
  end

  def balance

    pricer = NodeManager::Pricer.new(type: 'buy')
    Crypto.active.each do |crypto|
      coins = coin_balance(crypto)
      prices = pricer.evaluate(crypto)
      # TODO: Get the rest of this code working
      # convert to BTC
      # convert to USD
      # total it
    end
  end

protected

  def coin_balance(crypto)
    nodes = user.nodes.select { |node| node.crypto_id == crypto.id }
    nodes.blank? ? 0.0 : nodes.map { |nodes| nodes.balance }.reduce(&:+)
  end
end
