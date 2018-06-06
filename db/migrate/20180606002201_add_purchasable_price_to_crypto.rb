class AddPurchasablePriceToCrypto < ActiveRecord::Migration[5.2]
  def change
    add_column :cryptos, :stake, :integer
    add_column :cryptos, :purchasable_price, :float
  end
end
