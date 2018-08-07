class Transaction < ApplicationRecord
  belongs_to :account
  belongs_to :reward, optional: true
  belongs_to :withdrawal, optional: true

  scope :pending, -> { where(status: 'pending') }

  before_create :cache_values

  def name
    cached_crypto_name
  end

  def symbol
    cached_crypto_symbol
  end

  def cache_values(persist=false)
    cached = Reward.find_by(id: reward_id) if reward_id.present?
    cached = Withdrawal.find_by(id: withdrawal_id) if withdrawal_id.present?
    self.cached_crypto_name = cached&.name
    self.cached_crypto_symbol = cached&.symbol

    save! if persist
  end
end
