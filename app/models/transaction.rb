class Transaction < ApplicationRecord
  include Sluggable

  belongs_to :account
  belongs_to :reward, optional: true
  belongs_to :withdrawal, optional: true

  scope :pending, -> { where(status: :pending) }
  scope :processed, -> { where(status: :processed) }
  scope :canceled, -> { where(status: :canceled) }

  before_create :cache_values

  def name
    cached_crypto_name
  end

  def symbol
    cached_crypto_symbol
  end

  def cache_values(persist=false)
    if reward_id.present?
      reward = Reward.find_by(id: reward_id)
      self.cached_crypto_name = reward&.name
      self.cached_crypto_symbol = reward&.symbol
    elsif withdrawal_id.present?
      self.cached_crypto_name = 'Bitcoin'
      self.cached_crypto_symbol = 'btc'
    end

    save! if persist
  end
end
