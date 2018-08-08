class AddWalletToAccount < ActiveRecord::Migration[5.2]
  def change
    add_column :accounts, :wallet, :string
  end
end
