class AddTrustedIpToUser < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :trusted_ip, :string
    add_column :users, :trusted_at, :datetime
  end
end
