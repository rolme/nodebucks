class Affiliate < ApplicationRecord
  belongs_to :user

  scope :not_withdrawed, -> { where(withdrawed: false) } 
end
