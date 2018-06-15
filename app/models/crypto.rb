class Crypto < ApplicationRecord
  include Sluggable

  YEARLY     = 365
  MONTHLY    = 30
  WEEKLY     = 7
  PERCENTAGE = false
  VALUE      = true

  # This is run on :before_create as part of Sluggable
  def generate_slug(force=false)
    self.slug = name.parameterize if slug.nil? || force
  end

  def yearly_roi
    @_yearly_roi ||= {
      days: YEARLY,
      percentage: roi(YEARLY, PERCENTAGE),
      value: roi(YEARLY, VALUE)
    }
  end

  def monthly_roi
    @_monthly_roi ||= {
      days: MONTHLY,
      percentage:  roi(MONTHLY, PERCENTAGE),
      value: roi(MONTHLY, VALUE)
    }
  end

  def weekly_roi
    @_weekly_roi ||= {
      days: WEEKLY,
      percentage: roi(WEEKLY, PERCENTAGE),
      value: roi(WEEKLY, VALUE)
    }
  end

private

  def roi(days, format_type=VALUE)
    value = daily_reward * days.to_f * price
    (format_type) ? value : value/node_price
  end

end
