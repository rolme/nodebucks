class Withdrawal < ApplicationRecord
  include Sluggable

  belongs_to :admin,
             foreign_key: :last_modified_by_admin_id,
             class_name: 'User',
             optional: true
  belongs_to :user

  validate :target, presence: true
  validate :payment_type, presence: true

  has_many :transactions, dependent: :destroy

  scope :pending, -> { where(status: :pending) }

  # TODO: This should be an option when withdrawing, but isn't happening yet.
  def destination
    "Bitcoin"
  end
end
