class TransactionManager
  attr_reader :account, :system_account

  def initialize(account)
    @account = account
    @system_account = User.system.accounts.find { |a| a.crypto_id == account.crypto_id }
  end

  def deposit_reward(reward)
    node = Node.find(reward.node_id)
    owner = node.user
    fee = reward.fee

    fee -= fee * 0.2  if owner.affiliate_user_id_tier1.present?
    fee -= fee * 0.1  if owner.affiliate_user_id_tier2.present?
    fee -= fee * 0.05 if owner.affiliate_user_id_tier3.present?

    account_txn = account.transactions.create(amount: reward.total_amount, reward_id: reward.id, txn_type: 'deposit', notes: 'Reward deposit')
    system_txn = system_account.transactions.create(amount: fee, reward_id: reward.id, txn_type: 'deposit', notes: 'Fee deposit')
    system_account.transactions.create(amount: fee, reward_id: reward.id, txn_type: 'transfer', notes: "#{reward.fee} #{reward.symbol} fee transfer from #{reward.node.wallet} to Nodebucks")

    if(owner.affiliate_user_id_tier1.present?)
      affiliate_user_id_tier1_account = Account.where(user_id: owner.affiliate_user_id_tier1, crypto_id: node.crypto.id).first
      affiliate_user_id_tier1_account_txn = affiliate_user_id_tier1_account.transactions.create(amount: reward.fee * 0.2, reward_id: reward.id, txn_type: 'deposit', notes: 'Affiliate reward')
    end

    if(owner.affiliate_user_id_tier2.present?)
      affiliate_user_id_tier2_account = Account.where(user_id: owner.affiliate_user_id_tier2, crypto_id: node.crypto.id).first
      affiliate_user_id_tier2_account_txn = affiliate_user_id_tier2_account.transactions.create(amount: reward.fee * 0.1, reward_id: reward.id, txn_type: 'deposit', notes: 'Affiliate reward')
    end

    if(owner.affiliate_user_id_tier3.present?)
      affiliate_user_id_tier3_account = Account.where(user_id: owner.affiliate_user_id_tier3, crypto_id: node.crypto.id).first
      affiliate_user_id_tier3_account_txn = affiliate_user_id_tier3_account.transactions.create(amount: reward.fee * 0.05, reward_id: reward.id, txn_type: 'deposit', notes: 'Affiliate reward')
    end

    Account.transaction do
      account.update_attribute(:balance, account.balance + reward.total_amount)
      account_txn.update_attribute(:status, 'processed')

      if(affiliate_user_id_tier1_account.present?)
        affiliate_user_id_tier1_account.update_attribute(:balance, affiliate_user_id_tier1_account.balance + reward.fee * 0.2)
        affiliate_user_id_tier1_account_txn.update_attribute(:status, 'processed')
      end

      if (affiliate_user_id_tier2_account.present?)
        affiliate_user_id_tier2_account.update_attribute(:balance, affiliate_user_id_tier2_account.balance + reward.fee * 0.1)
        affiliate_user_id_tier2_account_txn.update_attribute(:status, 'processed')
      end

      if(affiliate_user_id_tier3_account.present?)
        affiliate_user_id_tier3_account.update_attribute(:balance, affiliate_user_id_tier3_account.balance + reward.fee * 0.05)
        affiliate_user_id_tier3_account_txn.update_attribute(:status, 'processed')
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
