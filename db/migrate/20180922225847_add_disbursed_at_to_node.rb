class AddDisbursedAtToNode < ActiveRecord::Migration[5.2]
  def change
    add_column :nodes, :disbursed_at, :datetime
  end
end
