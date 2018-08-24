class AddUniqueConstraintToUserAffiliateKey < ActiveRecord::Migration[5.2]
  def change
    add_index :users, :affiliate_key, unique: true
  end
end
