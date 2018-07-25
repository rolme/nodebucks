class CreateNodes < ActiveRecord::Migration[5.2]
  def change
    create_table :nodes do |t|
      t.references :user, foreign_key: true
      t.references :crypto, foreign_key: true
      t.string :slug, index: true
      t.string :status, default: :new
      t.string :ip
      t.decimal :cost
      t.integer :created_by_admin_id
      t.datetime :online_at
      t.datetime :sold_at
      t.string :wallet
      t.string :version
      t.datetime :last_upgraded_at
      t.string :vps_provider
      t.string :vps_url
      t.decimal :vps_monthly_cost
      t.string :withdraw_wallet
      t.integer :reward_setting, default: 0
      t.integer :sell_setting, default: 0
      t.string :sell_bitcoin_wallet
      t.decimal :sell_price
      t.string :stripe
      t.datetime :sell_priced_at
      t.datetime :buy_priced_at

      t.timestamps
    end
  end
end
