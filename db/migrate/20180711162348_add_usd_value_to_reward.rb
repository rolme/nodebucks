class AddUsdValueToReward < ActiveRecord::Migration[5.2]
  def change
    add_column :rewards, :usd_value, :decimal, default: 0.0
  end
end
