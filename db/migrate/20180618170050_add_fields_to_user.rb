class AddFieldsToUser < ActiveRecord::Migration[5.2]
  def change
    rename_column :users, :location, :address
    add_column :users, :city, :string
    add_column :users, :state, :string
    add_column :users, :zipcode, :string
    add_column :users, :country, :string
  end
end
