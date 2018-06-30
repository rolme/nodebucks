class AddWithdrawWalletToNode < ActiveRecord::Migration[5.2]
  def change
    add_column :nodes, :withdraw_wallet, :string
  end
end
