class AddPriceTypeToCryptoPrice < ActiveRecord::Migration[5.2]
  def change
    add_column :crypto_prices, :price_type, :string, default: 'buy'
  end
end
