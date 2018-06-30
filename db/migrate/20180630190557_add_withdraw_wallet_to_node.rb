class AddWithdrawWalletToNode < ActiveRecord::Migration[5.2]
  def change
    add_column :nodes, :withdraw_wallet, :string
    add_column :nodes, :reward_setting, :integer, default: 0
  end
end
