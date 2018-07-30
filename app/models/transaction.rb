class Transaction < ApplicationRecord
  belongs_to :account

  scope :pending, -> { where(status: 'pending') }
end
