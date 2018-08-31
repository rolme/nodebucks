class Order < ApplicationRecord
  belongs_to :user
  belongs_to :node

  before_create :generate_slug

private

  # TODO: need to do this better
  def generate_slug
    date = DateTime.current
    seed = sprintf '%03d', rand(0..999)
    major, minor = VERSION.split('.')[0..1]
    minor = sprintf '%02d', minor
    self.slug = date.strftime("%m%d-%y-#{major}#{minor}#{seed}")
  end
end
