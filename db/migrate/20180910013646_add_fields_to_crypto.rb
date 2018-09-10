class AddFieldsToCrypto < ActiveRecord::Migration[5.2]
  def change
    add_column :cryptos, :market_cap, :decimal, precision: 15, scale: 1
    add_column :cryptos, :volume, :decimal, precision: 15, scale: 1
    add_column :cryptos, :available_supply, :decimal, precision: 15, scale: 1
    add_column :cryptos, :total_supply, :decimal, precision: 15, scale: 1
  end
end
