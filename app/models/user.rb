class User < ApplicationRecord
  include Sluggable
  include SoftDeletable

  has_many :nodes

  TOKEN_AGE = 5.minutes

  has_secure_password

  validates :email, uniqueness: true, format: { with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i }
  validates :new_email, format: { with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i }, allow_blank: true
  validates :reset_token, uniqueness: true, allow_blank: true

  scope :non_admin, -> { where(admin: false) }

  def full_name
    "#{first} #{last}"
  end

  def reset!
    self.reset_token = SecureRandom.urlsafe_base64
    self.reset_at = DateTime.current
    save
  end

  def change_password!(password, password_confirmation)
    delete_token
    self.password = password
    self.password_confirmation = password_confirmation
    save
  end

  def token_valid?
    return false if reset_token.blank? or reset_at.blank?
    (reset_at + TOKEN_AGE) > DateTime.current
  end

  def delete_token!
    delete_token
    save
  end

  def verify_email!
    return true if new_email.blank?

    # TODO: There might be a chance that a user creates a subscription before
    #       verifying email...
    subscription.update_attribute(:email, new_email) if subscription.email != self.new_email
    self.email = new_email
    self.new_email = nil
    save
  end

  def delete_token
    self.reset_token = nil
    self.reset_at = nil
  end
end
