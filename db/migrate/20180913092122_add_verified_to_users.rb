class AddVerifiedToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :verified, :boolean, default: false
    add_column :users, :verification_pending, :boolean, default: false
    add_column :users, :verification_image, :string
  end
end
