json.admin do
  json.partial! 'users/creator', user: withdrawal.admin if withdrawal.admin.present?
end
json.amount do
  json.btc withdrawal.amount_btc
  json.usd withdrawal.amount_usd
end
json.cancelledAt withdrawal.cancelled_at&.to_formatted_s(:db)
json.createdAt withdrawal.created_at.to_formatted_s(:db)
json.user do
  json.partial! 'users/owner', user: withdrawal.user
end
json.processedAt withdrawal.processed_at&.to_formatted_s(:db)
json.slug withdrawal.slug
json.status withdrawal.status
json.updatedAt withdrawal.updated_at.to_formatted_s(:db)
