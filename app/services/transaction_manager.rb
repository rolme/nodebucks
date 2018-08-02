class TransactionManager
  attr_reader :account, :system_account

  def initialize(account)
    @account = account
    @system_account = User.system.accounts.find { |a| a.crypto_id == account.crypto.id }
  end

  def deposit_reward(reward)
    account_txn = account.transactions.create(reward_id: reward.id, txn_type: 'deposit', notes: 'Reward deposit')
    system_txn = system_account.transactions.create(reward_id: reward.id, txn_type: 'deposit', notes: 'Fee deposit')
    system_txn = system_account.transactions.create(reward_id: reward.id, txn_type: 'transfer', notes: "Wallet transfer from #{reward.node.wallet} to Nodebucks")

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
    balance     = account.balance
    account_txn = account.transactions.create(withdrawal_id: withdrawal.id, txn_type: 'withdraw', notes: 'Account withdrawal')
    system_txn = system_account.transactions.create(withdrawal_id: withdrawal.id, txn_type: 'deposit', notes: 'Fee deposit')
    system_txn = system_account.transactions.create(withdrawal_id: withdrawal.id, txn_type: 'transfer', notes: "Wallet transfer to Nodebucks")

    Account.transaction do
      account.balance -= withdrawal.total_amount
      account.save
      account_txn.update_attribute(:status, 'processed')

      system_account.balance += reward.fee
      system_account.save
      system_txn.update_attribute(:status, 'processed')
    end
  end

end
