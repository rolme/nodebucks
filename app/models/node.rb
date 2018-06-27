class Node < ApplicationRecord
  include Sluggable

  WEEK  = 7.days
  MONTH = 30.days
  YEAR  = 365.days

  belongs_to :crypto
  belongs_to :user
  belongs_to :creator, foreign_key: :created_by_admin_id, class_name: 'User', optional: true

  has_many :rewards

  validates :cost, presence: true

  # TODO: More math needed here
  def reward_total
    rewards.map(&:amount).reduce(&:+) || 0.0
  end

  def week_reward
    reward_timeframe(WEEK)
  end

  def month_reward
    reward_timeframe(MONTH)
  end

  def year_reward
    reward_timeframe(YEAR)
  end

private

  def reward_timeframe(timeframe)
    now   = DateTime.current
    range = ((now-timeframe)..now)
    rewards.select{ |r| range.cover?(r.timestamp) }.map(&:amount).reduce(&:+) || 0.0
  end
end
