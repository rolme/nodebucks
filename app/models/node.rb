class Node < ApplicationRecord
  include Sluggable

  belongs_to :crypto
  belongs_to :user
  belongs_to :creator, foreign_key: :created_by_admin_id, class_name: 'User', optional: true

  validates :cost, presence: true
end
