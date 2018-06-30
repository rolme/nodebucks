class AddBalanceToNode < ActiveRecord::Migration[5.2]
  def change
    add_column :nodes, :balance, :decimal, default: 0.0
  end
end
