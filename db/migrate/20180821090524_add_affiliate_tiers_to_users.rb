class AddAffiliateTiersToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :affiliate_user_id_tier1, :integer
    add_column :users, :affiliate_user_id_tier2, :integer
    add_column :users, :affiliate_user_id_tier3, :integer
  end
end
