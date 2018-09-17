class Referral < ApplicationRecord
  belongs_to :user
  belongs_to :referral_user, foreign_key: :referred_by_user, class_name: 'User'
end
