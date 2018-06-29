class AddExplorerUrlToCrypto < ActiveRecord::Migration[5.2]
  def change
    add_column :cryptos, :explorer_url, :string
  end
end
