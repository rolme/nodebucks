class TransactionManager
  attr_reader :account, :system_account

  def initialize(account)
    @account = account
    @system_account = User.system.accounts.find { |a| a.crypto_id == account.crypto.id }
  end

  def deposit_reward(reward)
    account_txn = account.transactions.create(amount: reward.total_amount, reward_id: reward.id, txn_type: 'deposit', notes: 'Reward deposit')
    system_txn = system_account.transactions.create(amount: reward.fee, reward_id: reward.id, txn_type: 'deposit', notes: 'Fee deposit')
    system_account.transactions.create(amount: reward.fee, reward_id: reward.id, txn_type: 'transfer', notes: "#{reward.fee} #{reward.symbol} fee transfer from #{reward.node.wallet} to Nodebucks")

    Account.transaction do
      account.balance += reward.total_amount
      account.save
      account_txn.update_attribute(:status, 'processed')

      system_account.balance += reward.fee
      system_account.save
      system_txn.update_attribute(:status, 'processed')
    end
  end

  def withdraw(withdrawal)
    balance            = withdrawal.balances.select { |b| b[:symbol] == account.symbol }
    fee                = balance * account.crypto.percentage_hosting_fee
    account_txn        = account.transactions.create(amount: balance, withdrawal_id: withdrawal.id, txn_type: 'withdraw', notes: "Account withdrawal of #{balance} #{account.symbol} (includes #{fee} #{account.symbol} fee)")
    system_fee_txn     = system_account.transactions.create(amount: fee, withdrawal_id: withdrawal.id, txn_type: 'deposit', notes: "Fee deposit (#{fee} #{account.symbol})")
    system_balance_txn = system_account.transactions.create(amount: balance - fee, withdrawal_id: withdrawal.id, txn_type: 'deposit', notes: "Balance deposit (#{balance - fee} #{account.symbol})")
    system_account.transactions.create(amount: balance, withdrawal_id: withdrawal.id, txn_type: 'transfer', notes: "#{balance} #{account.symbol} balance transfer to Nodebucks (includes #{fee} #{account.symbol} fee)")
    system_account.transactions.create(amount: balance - fee, withdrawal_id: withdrawal.id, txn_type: 'transfer', notes: "#{balance - fee} #{account.symbol} transfer to User #{withdrawal.user.email}")

    Account.transaction do
      account.balance -= balance
      account.save

      system_account.balance += balance
      system_account.save
      system_balance_txn.update_attribute(:status, 'processed')
      system_fee_txn.update_attribute(:status, 'processed')
    end
  end

end
