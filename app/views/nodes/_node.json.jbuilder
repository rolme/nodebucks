json.balance do
  json.coin (node.balance != 0.0) ? node.balance - node.stake : 0.0
  json.usd (node.balance != 0.0) ? (node.balance - node.stake) * node.crypto.price : 0.0
end
json.cost node.cost
json.createdAt node.created_at.to_formatted_s(:db)
json.creator do
  json.partial! 'users/creator', user: node.creator if node.creator.present?
end
json.crypto do
  json.partial! 'cryptos/crypto', crypto: node.crypto
end
json.events node.events.sort { |e1, e2| e2.timestamp <=> e1.timestamp }.each do |event|
  json.id event.id
  json.timestamp event.timestamp.to_formatted_s(:db)
  json.type event.event_type
  json.description event.description
  json.value event.value
end
json.ip node.ip
json.isReady node.ready?
json.lastUpgradedAt node.last_upgraded_at&.to_formatted_s(:db)
json.onlineAt node.online_at&.to_formatted_s(:db)
json.owner do
  json.partial! 'users/owner', user: node.user
end
json.rewardSetting node.reward_setting
json.rewardTotal node.reward_total * node.crypto.price
json.rewards do
  json.week node.week_reward * node.crypto.price
  json.quarter node.quarter_reward * node.crypto.price
  json.month node.month_reward * node.crypto.price
  json.year node.year_reward * node.crypto.price
end
json.sellBitcoinWallet node.sell_bitcoin_wallet
json.sellPrice node.sell_price
json.sellSetting node.sell_setting
json.slug node.slug
json.soldAt node.sold_at&.to_formatted_s(:db)
json.status node.status
json.stripe node.stripe
json.timeLimit Node::TIME_LIMIT.to_i
json.wallet node.wallet
json.withdrawWallet node.withdraw_wallet
json.value node.value
json.version node.version
json.vpsMonthlyCost node.vps_monthly_cost
json.vpsProvider node.vps_provider
json.vpsUrl node.vps_url
