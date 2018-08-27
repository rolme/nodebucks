class AddAffiliateKeyToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :affiliate_key, :string
    add_column :users, :affiliate_key_created_at, :datetime
  end
end
