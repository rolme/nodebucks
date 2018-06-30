class Node < ApplicationRecord
  include Sluggable

  WEEK    = 7.days
  MONTH   = 30.days
  QUARTER = 90.days
  YEAR    = 365.days

  REWARD_AUTO_NONE       = 0
  REWARD_AUTO_BUILD      = 10
  REWARD_AUTO_WITHDRAWAL = 20

  belongs_to :crypto
  belongs_to :user
  belongs_to :creator, foreign_key: :created_by_admin_id, class_name: 'User', optional: true

  has_many :events, dependent: :destroy
  has_many :rewards, dependent: :destroy

  delegate :explorer_url,
           :percentage_conversion_fee,
           :percentage_hosting_fee,
           :price,
           :stake,
           :symbol,
           to: :crypto

  validates :cost, presence: true

  scope :online,     -> { where(status: 'online') }
  scope :reserved,   -> { where(status: 'reserved') }
  scope :unreserved, -> { where.not(status: 'reserved') }

  def ready?
    wallet.present? && ip.present?
  end

  # TODO: Should value of the node be; stake or balance
  def value
    stake * price
  end

  def wallet_url
    @_wallet_url ||= "#{explorer_url}#{wallet}"
  end

  # TODO: More math needed here
  def reward_total
    rewards.map(&:total_amount).reduce(&:+) || 0.0
  end

  def week_reward
    reward_timeframe(WEEK)
  end

  def month_reward
    reward_timeframe(MONTH)
  end

  def quarter_reward
    reward_timeframe(QUARTER)
  end

  def year_reward
    reward_timeframe(YEAR)
  end

private

  def reward_timeframe(timeframe)
    now   = DateTime.current
    range = ((now-timeframe)..now)
    rewards.select{ |r| range.cover?(r.timestamp) }.map(&:total_amount).reduce(&:+) || 0.0
  end
end
