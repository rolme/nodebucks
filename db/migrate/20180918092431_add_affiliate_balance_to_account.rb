class AddAffiliateBalanceToAccount < ActiveRecord::Migration[5.2]
  def change
    add_column :accounts, :affiliate_balance, :decimal
  end
end
