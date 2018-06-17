json.creator do
  json.partial! 'users/creator', user: node.creator if node.creator.present?
end
json.cost node.cost
json.crypto do
  json.partial! 'cryptos/crypto', crypto: node.crypto
end
json.ip node.ip
json.lastUpgradedAt node.last_upgraded_at
json.onlineAt node.online_at
json.slug node.slug
json.soldAt node.sold_at
json.status node.status
json.owner do
  json.partial! 'users/owner', user: node.user
end
json.version node.version
json.vpsMonthlyCost node.vps_monthly_cost
json.vpsProvider node.vps_provider
json.vpsUrl node.vps_url
