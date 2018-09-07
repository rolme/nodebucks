class Order < ApplicationRecord
  belongs_to :user
  belongs_to :node

  before_create :generate_slug

  scope :filter_by_node, ->(node_slug) {
    return unless node_slug.present?
    joins(:node).where("nodes.slug LIKE ?", node_slug)
  }

  scope :filter_by_user, ->(user_slug) {
    return unless user_slug.present?
    joins(:user).where("users.slug LIKE ?", user_slug)
  }

  def paid!
    update_attribute(:status, :paid)
  end

  def unpaid!
    update_attribute(:status, :unpaid)
  end

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
