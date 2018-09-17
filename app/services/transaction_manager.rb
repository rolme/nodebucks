class TransactionManager
  attr_reader :account, :system_account

  def initialize(account)
    @account = account
    @system_account = User.system.accounts.find { |a| a.crypto_id == account.crypto_id }
  end

  def deposit_reward(reward)
    node  = Node.find(reward.node_id)
    owner = node.user
    fee   = reward.fee

    tier1 = owner.upline
    tier2 = owner.upline(2)
    tier3 = owner.upline(3)

    reward_percentages = [0.2, 0.1, 0.05]
    [tier1, tier2, tier3].compact.each do |upline|
      percentage      = reward_percentages.shift
      fee            -= reward.fee * percentage
      upline_account  = Account.find_by(user_id: upline.id, crypto_id: node.crypto.id)
      upline_account.transactions.create(amount: reward.fee * percentage, reward_id: reward.id, txn_type: 'deposit', notes: 'affiliate reward')
    end

    account_txn = account.transactions.create(amount: reward.total_amount, reward_id: reward.id, txn_type: 'deposit', notes: 'Reward deposit')
    system_txn  = system_account.transactions.create(amount: fee, reward_id: reward.id, txn_type: 'deposit', notes: 'Fee deposit')
    system_account.transactions.create(amount: fee, reward_id: reward.id, txn_type: 'transfer', notes: "#{reward.fee} #{reward.symbol} fee (minus #{reward.fee - fee} affiliate rewards) transfer from #{reward.node.wallet} to Nodebucks")

    Account.transaction do
      account.update_attribute(:balance, account.balance + reward.total_amount)
      account_txn.update_attribute(:status, 'processed')

      reward_percentages = [0.2, 0.1, 0.05]
      [tier1, tier2, tier3].compact.each do |upline|
        percentage      = reward_percentages.shift
        upline_account  = Account.find_by(user_id: upline.id, crypto_id: node.crypto.id)
        upline_account.update_attribute(:balance, upline_account.balance + reward.fee * percentage)
        upline.update_attribute(:affiliate_earnings, upline.affiliate_earnings + reward.fee * percentage)
        txn = upline_account.transactions.find(amount: reward.fee * percentage, reward_id: reward.id, txn_type: 'deposit', notes: 'affiliate reward')
        txn.update_attribute(:status, 'processed')
      end

      system_account.update_attribute(:balance, system_account.balance + fee)
      system_txn.update_attribute(:status, 'processed')
    end
  end

  def withdraw(withdrawal)
    account_balance    = withdrawal.balances.find { |b| b["symbol"] == account.symbol }
    balance            = account_balance["value"].to_f
    fee                = balance * account.crypto.percentage_hosting_fee

    account_txn        = account.transactions.create(amount: balance, withdrawal_id: withdrawal.id, txn_type: 'withdraw', notes: "Account withdrawal of #{balance} #{account.symbol} (includes #{fee} #{account.symbol} fee)")
    system_fee_txn     = system_account.transactions.create(amount: fee, withdrawal_id: withdrawal.id, txn_type: 'deposit', notes: "Fee deposit (#{fee} #{account.symbol})")
    system_balance_txn = system_account.transactions.create(amount: balance - fee, withdrawal_id: withdrawal.id, txn_type: 'deposit', notes: "Balance deposit (#{balance - fee} #{account.symbol})")
    system_account.transactions.create(amount: balance, withdrawal_id: withdrawal.id, txn_type: 'transfer', notes: "#{balance} #{account.symbol} balance transfer to Nodebucks (includes #{fee} #{account.symbol} fee)")
    system_account.transactions.create(amount: balance - fee, withdrawal_id: withdrawal.id, txn_type: 'transfer', notes: "#{balance - fee} #{account.symbol} transfer to User #{withdrawal.user.email} [##{account.wallet} BTC wallet]")

    Account.transaction do
      account.update_attribute(:balance, account.balance - balance)
      system_account.update_attribute(:balance, system_account.balance + balance)
      system_balance_txn.update_attribute(:status, 'processed')
      system_fee_txn.update_attribute(:status, 'processed')
    end
  end
end
