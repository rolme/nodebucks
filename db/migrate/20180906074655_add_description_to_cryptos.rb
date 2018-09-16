class AddDescriptionToCryptos < ActiveRecord::Migration[5.2]
  def change
    add_column :cryptos, :description, :text
  end
end
