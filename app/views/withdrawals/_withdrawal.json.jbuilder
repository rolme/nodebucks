json.admin do
  json.partial! 'users/creator', user: withdrawal.admin if withdrawal.admin.present?
end
json.amount withdrawal.amount
json.cancelledAt withdrawal.cancelled_at&.to_formatted_s(:db)
json.createdAt withdrawal.created_at.to_formatted_s(:db)
json.crypto do
  json.partial! 'cryptos/basic', crypto: withdrawal.crypto
end
json.owner do
  json.partial! 'users/owner', user: withdrawal.user
end
json.processedAt withdrawal.processed_at&.to_formatted_s(:db)
json.slug withdrawal.slug
json.status withdrawal.status
json.updatedAt withdrawal.updated_at.to_formatted_s(:db)
