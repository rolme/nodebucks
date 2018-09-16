class AddProfileToCryptos < ActiveRecord::Migration[5.2]
  def change
    add_column :cryptos, :profile, :text
  end
end
