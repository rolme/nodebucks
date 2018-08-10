class User < ApplicationRecord
  include Sluggable
  include SoftDeletable

  SYSTEM_ACCOUNT_ID = 1
  TOKEN_AGE         = 5.minutes

  has_many :accounts, dependent: :destroy
  has_many :nodes, dependent: :destroy
  has_many :withdrawals, dependent: :destroy

  has_secure_password

  validates :email, uniqueness: true, format: { with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i }
  validates :new_email, format: { with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i }, allow_blank: true
  validates :reset_token, uniqueness: true, allow_blank: true

  after_create :create_btc_account

  def self.system
    @@_system ||= User.unscoped.find_by(id: SYSTEM_ACCOUNT_ID, email: nil)
  end

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
    Crypto.active.sort_by(&:name).map do |crypto|
      account = accounts.find { |a| a.crypto_id == crypto.id }
      filtered_nodes = nodes.select{ |n| n.crypto_id == crypto.id && ['online', 'new'].include?(n.status) }
      if account.nil?
        {
          fee: crypto.percentage_conversion_fee,
          has_nodes: false,
          name: crypto.name,
          slug: crypto.slug,
          symbol: crypto.symbol,
          usd: 0.0,
          value: 0.0,
          wallet: nil
        }
      else
        {
          fee: crypto.percentage_conversion_fee,
          has_nodes: filtered_nodes.present?,
          name: account.name,
          slug: crypto.slug,
          symbol: account.symbol,
          usd: account.balance * crypto.price,
          value: account.balance,
          wallet: account.wallet
        }
      end
    end
  end

  def btc_wallet
    @btc_wallet ||= accounts.find { |a| a.symbol == 'btc' }.wallet
  end

  def total_balance
    pricer = NodeManager::Pricer.new(type: 'buy')
    btc = accounts.map { |account| pricer.to_btc(account.crypto, account.balance) }.reduce(&:+)
    { btc: btc, usd: btc * pricer.avg_btc_usdt }
  end

  def create_btc_account
    account   = accounts.find{ |a| a.symbol == 'btc' }
    account ||= accounts.create(crypto_id: Crypto.find_by(symbol: 'btc').id)
  end
end
