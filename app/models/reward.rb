class Reward < ApplicationRecord
  belongs_to :node

  before_create :cache_values

  def cache_values(persist=false)
    cached_node = node || Node.find(node_id)
    self.cached_crypto_name = cached_node&.name
    self.cached_crypto_symbol = cached_node&.symbol

    save! if persist
  end
end
