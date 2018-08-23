json.address user.address
json.admin user.admin? # NOTE: This info is not part of token (JWT)
json.avatar user.avatar
json.balances user.balances.each do |balance|
  json.fee balance[:fee]
  json.hasNodes balance[:has_nodes]
  json.name balance[:name]
  json.slug balance[:slug]
  json.symbol balance[:symbol]
  json.usd balance[:usd]
  json.value balance[:value]
  json.wallet balance[:wallet]
end
json.city user.city
json.confirmedAt user.confirmed_at&.to_formatted_s(:db)
json.country user.country
json.createdAt user.created_at.to_formatted_s(:db)
json.deletedAt user.deleted_at&.to_formatted_s(:db)
json.email user.email
json.first user.first
json.fullName user.full_name
json.id user.id
json.last user.last
json.newEmail user.new_email
json.nickname user.nickname
json.slug user.slug
json.affiliateKey user.affiliate_key
json.affiliateKeyCreatedAt user.affiliate_key_created_at.to_formatted_s(:db)
json.state user.state
json.updatedAt user.updated_at.to_formatted_s(:db)
json.zipcode user.zipcode
