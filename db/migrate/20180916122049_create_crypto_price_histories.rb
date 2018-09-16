class CreateCryptoPriceHistories < ActiveRecord::Migration[5.2]
  def change
    create_table :crypto_price_histories do |t|
      t.references :crypto, foreign_key: true
      t.jsonb :data, null: false, default: {}
      t.string :source
      t.decimal :usd, default: 0.0

      t.timestamps
    end
  end
end
