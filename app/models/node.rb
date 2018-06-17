class Node < ApplicationRecord
  include Sluggable

  belongs_to :crypto
  belongs_to :user

  validates :cost, presence: true
end
