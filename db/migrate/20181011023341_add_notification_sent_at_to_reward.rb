class AddNotificationSentAtToReward < ActiveRecord::Migration[5.2]
  def change
    add_column :rewards, :notification_sent_at, :datetime
    add_column :rewards, :balance, :decimal
    add_column :rewards, :user_notification_setting_on, :boolean, default: true
  end
end
