class CreateCryptos < ActiveRecord::Migration[5.2]
  def change
    create_table :cryptos do |t|
      t.string :slug
      t.string :name
      t.string :symbol
      t.string :url
      t.string :status
      t.decimal :price

      t.timestamps
    end
  end
end
