class AddSellToNode < ActiveRecord::Migration[5.2]
  def change
    add_column :nodes, :sell_setting, :integer, default: 0
    add_column :nodes, :sell_bitcoin_wallet, :string
    add_column :nodes, :sell_price, :decimal
    add_column :nodes, :stripe, :string
    add_column :nodes, :sell_priced_at, :datetime
    add_column :nodes, :buy_priced_at, :datetime
  end
end
