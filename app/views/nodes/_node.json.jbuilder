json.cost node.cost
json.creator do
  json.partial! 'users/creator', user: node.creator if node.creator.present?
end
json.crypto do
  json.partial! 'cryptos/crypto', crypto: node.crypto
end
json.ip node.ip
json.lastUpgradedAt node.last_upgraded_at&.to_formatted_s(:db)
json.onlineAt node.online_at&.to_formatted_s(:db)
json.owner do
  json.partial! 'users/owner', user: node.user
end
json.rewardTotal node.reward_total
json.rewards do
  json.week node.week_reward
  json.month node.month_reward
  json.year node.year_reward
end
json.slug node.slug
json.soldAt node.sold_at&.to_formatted_s(:db)
json.status node.status
json.wallet node.wallet
json.version node.version
json.vpsMonthlyCost node.vps_monthly_cost
json.vpsProvider node.vps_provider
json.vpsUrl node.vps_url
