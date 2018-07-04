class AddFieldsToNode < ActiveRecord::Migration[5.2]
  def change
    add_column :nodes, :wallet, :string
  end
end
