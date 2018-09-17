class User < ApplicationRecord
  include Sluggable
  include SoftDeletable

  SYSTEM_ACCOUNT_ID = 1
  TOKEN_AGE         = 15.minutes

  mount_uploader :avatar, AvatarUploader

  has_many :accounts, dependent: :destroy
  has_many :nodes, dependent: :destroy
  has_many :orders, dependent: :destroy
  has_many :withdrawals, dependent: :destroy

  has_secure_password

  validates :email, uniqueness: true, format: { with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i }
  validates :new_email, format: { with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i }, allow_blank: true
  validates :reset_token, uniqueness: true, allow_blank: true
  validates :affiliate_key, uniqueness: true

  before_create :generate_affiliate_key
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
          usd: CryptoPricer.to_usdt(account.crypto_id, account.balance),
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
    btc = 0.0
    usd = 0.0
    accounts.each do |account|
      btc += CryptoPricer.to_btc(account.crypto_id, account.balance)
      usd += CryptoPricer.to_usdt(account.crypto_id, account.balance)
    end
    { btc: btc, usd: usd }
  end

  def reserved_node
    @__reserved_node ||= nodes.find { |n| n.status == 'reserved' }
  end

  def create_btc_account
    account   = accounts.find{ |a| a.symbol == 'btc' }
    account ||= accounts.create(crypto_id: Crypto.find_by(symbol: 'btc').id)
  end

  def set_affiliate_referrers(affiliate_key)
    referrer_tier1 = User.find_by(affiliate_key: affiliate_key)
    if referrer_tier1.present?
      self.affiliate_user_id_tier1 = referrer_tier1.id

      referrer_tier2 = User.find(referrer_tier1.affiliate_user_id_tier1)
      if referrer_tier2.present?
        self.affiliate_user_id_tier2 = referrer_tier2.id

        referrer_tier3 = User.find(referrer_tier2.affiliate_user_id_tier1)
        self.affiliate_user_id_tier3 = referrer_tier3.id if referrer_tier3.present?
      end
    end
  end

  def tier1_referrals
    User.where(affiliate_user_id_tier1: id)
  end

  def tier2_referrals
    User.where(affiliate_user_id_tier2: id)
  end

  def tier3_referrals
    User.where(affiliate_user_id_tier3: id)
  end

  def referral_masternodes
    tier1_referrals.size + tier2_referrals.size + tier3_referrals.size
  end

  def total_affiliate_earnings
    accounts.map {|account| account.transactions.where(notes: 'Affiliate reward').sum(&:amount) }.sum
  end

  private

  def generate_affiliate_key
    self.affiliate_key = SecureRandom.urlsafe_base64
    self.affiliate_key_created_at = DateTime.current
  end
end
