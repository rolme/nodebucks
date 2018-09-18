class SupportMailerService
  def self.send_node_purchased_notification(user, node)
    SupportMailer.send_email("User #{user.email} purchased new node server", 
      "User #{user.email} purchased #{node.cached_crypto_name} node server.").deliver_later
  end

  def self.send_node_sold_notification(user, node)
    SupportMailer.send_email("User #{user.email} sold node server", 
      "User #{user.email} sold #{node.cached_crypto_name} node server.").deliver_later
  end

  def self.send_withdrawal_requested_notification(user, withdrawal)
    SupportMailer.send_email("User #{user.email} requested new withdrawal", "User #{user.email} requested new withdrawal with 
      btc amount: $ #{withdrawal.amount_btc} and usd amount : $ #{withdrawal.amount_usd}.").deliver_later
  end

  def self.send_user_received_reward(user, amount, node)
    SupportMailer.send_email("User #{user.email} received new reward",
      "User #{user.email} received $ #{amount} from #{node.cached_crypto_name} node server.").deliver_later
  end

  def self.send_user_balance_reached_masternode_price_notification(user, node)
    SupportMailer.send_email("#{user.email} account balance reached new node price",
      "#{user.email} account balance reached #{node.cached_crypto_name} node price.").deliver_later
  end
end
