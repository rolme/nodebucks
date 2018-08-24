class AddLimitToMasternodesColumn < ActiveRecord::Migration[5.2]
  def change
    change_column :cryptos, :masternodes, :integer, limit: 8
  end
end
