json.admin do
  json.partial! 'users/creator', user: withdrawal.admin if withdrawal.admin.present?
end
json.amount do
  json.btc withdrawal.amount_btc
  json.usd withdrawal.amount_usd
end
json.balances withdrawal.user.balances.each do |balance|
  json.hasNodes balance[:has_nodes]
  json.name balance[:name]
  json.slug balance[:slug]
  json.symbol balance[:symbol]
  json.usd balance[:usd]
  json.value balance[:value]
  json.affiliate_balance balance[:affiliate_balance]
end
json.cancelledAt withdrawal.cancelled_at&.to_formatted_s(:db)
json.createdAt withdrawal.created_at.to_formatted_s(:db)
json.destination withdrawal.destination
json.processedAt withdrawal.processed_at&.to_formatted_s(:db)
json.slug withdrawal.slug
json.status withdrawal.status
json.user do
  json.partial! 'users/owner', user: withdrawal.user
end
json.updatedAt withdrawal.updated_at.to_formatted_s(:db)
