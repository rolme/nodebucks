class CreateWithdrawals < ActiveRecord::Migration[5.2]
  def change
    create_table :withdrawals do |t|
      t.references :user, foreign_key: true
      t.string :symbol, default: 'btc'
      t.string :slug
      t.decimal :amount, default: 0.0
      t.string :status, default: 'pending'
      t.integer :last_modified_by_admin_id
      t.datetime :processed_at
      t.datetime :cancelled_at

      t.timestamps
    end
  end
end
