class RemoveBalanceColumnFromWithdrawal < ActiveRecord::Migration[5.2]
  def change
    remove_column :withdrawals, :balance, :decimal, default: 0.0
  end
end
