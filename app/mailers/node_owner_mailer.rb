class NodeOwnerMailer < ApplicationMailer
  def online(user, node)
    @user = user
    @node = node

    mail(
      :content_type => "text/html",
      :subject => "Your #{node.name.capitalize} masternode is online.",
      :to => @user.email
    )
  end

  def reward(user, reward)
    @user = user
    @reward = reward

    mail(
      :content_type => "text/html",
      :subject => "Your #{reward.node.name.capitalize} masternode has received a reward.",
      :to => @user.email
    )
  end
end
