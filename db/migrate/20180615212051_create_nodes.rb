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
      t.string :version
      t.datetime :last_upgraded_at
      t.string :vps_provider
      t.string :vps_url
      t.decimal :vps_monthly_cost

      t.timestamps
    end
  end
end
