class NodeOwnerMailer < ApplicationMailer
  def online(node)
    @node = node
    @user = node.user

    if @node.online_mail_sent_at.blank?
      mail(
        :content_type => "text/html",
        :subject => "Your #{@node.name.capitalize} masternode is online.",
        :to => (Rails.env.production?) ? @user.email : 'nodebucks.staging@gmail.com'
      )
      @node.update_attribute(:online_mail_sent_at, DateTime.current)
    end
  end

  def reward(reward)
    @reward = reward
    @user   = reward.node.user
    @account_amount = @user.balances.find{ |b| b[:name] == @reward.node.name }[:value]
    mail(
      :content_type => "text/html",
      :subject => "Your #{reward.node.name.capitalize} masternode has received a reward.",
      :to => (Rails.env.production?) ? @user.email : 'nodebucks.staging@gmail.com'
    )
  end
end
