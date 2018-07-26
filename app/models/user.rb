class User < ApplicationRecord
  include Sluggable
  include SoftDeletable

  has_many :nodes
  has_many :withdrawals

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


  # TODO: This should be a separate services UserWithdrawal?
  def pending_withdrawal_value(crypto_id)
    pending = withdrawals.select { |w| w.crypto_id == crypto_id && w.status == 'pending' }
    return 0.0 if pending.blank?

    pending.map { |w| w.amount.to_f }.reduce(&:+)
  end

  # TODO: This should be a separate services UserWithdrawal?
  def balances
    Crypto.all.sort_by(&:name).map do |crypto|
      filtered_nodes = nodes.select{ |node| node.crypto_id == crypto.id && node.status == 'online' }
      if filtered_nodes.empty?
        {
          has_nodes: false,
          name: crypto.name,
          pending_value: 0.0,
          pending_usd: 0.0,
          slug: crypto.slug,
          symbol: crypto.symbol,
          usd: 0.0,
          value: 0.0,
        }
      else
        pending_value = pending_withdrawal_value(crypto.id)
        balance_value = filtered_nodes.map(&:balance).reduce(&:+)
        balance_value = balance_value - (filtered_nodes.count * crypto.stake)

        {
          has_nodes: !!filtered_nodes.count,
          name: crypto.name,
          pending_usd: pending_value * crypto.price,
          pending_value: pending_value,
          slug: crypto.slug,
          symbol: crypto.symbol,
          usd: balance_value * crypto.price,
          value: balance_value
        }
      end
    end
  end

  # TODO: This should be a separate services UserWithdrawal?
  def total_balance
    balances.each.map
  end

end
