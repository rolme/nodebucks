class AddTickerUrlToCrypto < ActiveRecord::Migration[5.2]
  def change
    add_column :cryptos, :ticker_url, :string
  end
end
