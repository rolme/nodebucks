class RenameColumnNodesToMasternodesCrypto < ActiveRecord::Migration[5.2]
  def change
    rename_column :cryptos, :nodes, :masternodes
  end
end
