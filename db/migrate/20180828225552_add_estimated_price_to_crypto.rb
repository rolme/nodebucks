class AddEstimatedPriceToCrypto < ActiveRecord::Migration[5.2]
  def change
    add_column :cryptos, :estimated_price, :decimal, default: 0.0
  end
end
