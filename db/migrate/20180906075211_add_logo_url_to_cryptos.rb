class AddLogoUrlToCryptos < ActiveRecord::Migration[5.2]
  def change
    add_column :cryptos, :logo_url, :string
  end
end
