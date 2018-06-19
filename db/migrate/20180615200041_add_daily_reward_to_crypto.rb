class AddDailyRewardToCrypto < ActiveRecord::Migration[5.2]
  def change
    add_column :cryptos, :daily_reward, :decimal
    remove_column :cryptos, :annual_roi, :decimal
  end
end
