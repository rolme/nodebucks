class AddFeesToCrypto < ActiveRecord::Migration[5.2]
  def change
    add_column :cryptos, :estimated_node_price, :decimal
    add_column :cryptos, :flat_setup_fee, :decimal, default: 0.0
    add_column :cryptos, :percentage_setup_fee, :decimal, default: 0.2
    add_column :cryptos, :percentage_hosting_fee, :decimal, default: 0.01
    add_column :cryptos, :percentage_conversion_fee, :decimal, default: 0.03
  end
end
