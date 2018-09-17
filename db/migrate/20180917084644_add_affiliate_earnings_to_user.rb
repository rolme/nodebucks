class AddAffiliateEarningsToUser < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :affiliate_earnings, :decimal
  end
end
