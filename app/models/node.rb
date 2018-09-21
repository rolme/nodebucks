class Node < ApplicationRecord
  include Sluggable

  TIME_LIMIT = 180.seconds

  WEEK    = 7.days
  MONTH   = 30.days
  QUARTER = 90.days
  YEAR    = 365.days

  REWARD_AUTO_NONE       = 0
  REWARD_AUTO_BUILD      = 10
  REWARD_AUTO_WITHDRAWAL = 20

  SELL_BITCOIN_WALLET    = 0
  SELL_STRIPE            = 10

  belongs_to :account
  belongs_to :crypto
  belongs_to :creator, foreign_key: :created_by_admin_id, class_name: 'User', optional: true
  belongs_to :user

  has_many :events, dependent: :destroy
  has_many :node_prices, class_name: "NodePriceHistory", dependent: :destroy
  has_many :orders, dependent: :destroy
  has_many :rewards, dependent: :destroy


  delegate :explorer_url,
           :name,
           :percentage_conversion_fee,
           :percentage_hosting_fee,
           :price,
           :stake,
           :symbol,
           :ticker_url,
           to: :crypto

 delegate :price,
          to: :crypto,
          prefix: true

  validates :cost, presence: true

  scope :online,     -> { where(status: 'online') }
  scope :reserved,   -> { where(status: 'reserved') }
  scope :unreserved, -> { where.not(status: 'reserved') }
  scope :unsold,     -> { where.not(status: 'sold') }

  before_create :cache_values

  def name
    cached_crypto_name
  end

  def symbol
    cached_crypto_symbol
  end

  def ready?
    wallet.present? && ip.present?
  end

  def value
    @_value ||= crypto.sellable_price * (1.0 - percentage_conversion_fee)
  end

  def wallet_url
    return "#{explorer_url}#{wallet}.htm" if symbol == 'pivx'
    "#{explorer_url}#{wallet}"
  end

  # TODO: More math needed here
  def reward_total
    return @__reward_total if @__reward_total.present?

     total = rewards.map(&:total_amount).reduce(&:+) || 0.0
     @__reward_total = CryptoPricer.to_usdt(crypto_id, total, 'sell')
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

  def cache_values(persist=false)
    crypto = Crypto.find(crypto_id)
    self.cached_crypto_name = crypto&.name
    self.cached_crypto_symbol = crypto&.symbol

    save! if persist
  end

  def cost_to_cents
    (cost.round(2) * 100).to_i
  end

  def sell!
    self.status = 'sold'
    save!
  end

private

  def reward_timeframe(timeframe)
    now   = DateTime.current
    range = ((now-timeframe)..now)
    # rewards.select{ |r| range.cover?(r.timestamp) }.map(&:usd_value).reduce(&:+) || 0.0

    total = rewards.select{ |r| range.cover?(r.timestamp) }.map(&:total_amount).reduce(&:+) || 0.0
    CryptoPricer.to_usdt(crypto_id, total, 'sell')
  end
end
