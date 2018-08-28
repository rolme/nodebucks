class AddBlockRewardToCrypto < ActiveRecord::Migration[5.2]
  def change
    add_column :cryptos, :block_reward, :decimal
  end
end
