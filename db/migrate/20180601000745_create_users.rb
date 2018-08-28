class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :first
      t.string :last
      t.string :email
      t.string :password_digest
      t.string :nickname
      t.boolean :admin
      t.boolean :accessible, default: true
      t.string :slug
      t.datetime :confirmed_at
      t.string :reset_token
      t.datetime :reset_at
      t.datetime :deleted_at
      t.string :new_email
      t.string :avatar
      t.string :facebook
      t.string :google
      t.string :linkedin
      t.string :address
      t.string :city
      t.string :state
      t.string :zipcode
      t.string :country

      t.integer :affiliate_user_id_tier1
      t.integer :affiliate_user_id_tier2
      t.integer :affiliate_user_id_tier3
      t.string :affiliate_key, index: true, unique: true
      t.datetime :affiliate_key_created_at

      t.timestamps
    end
  end
end
