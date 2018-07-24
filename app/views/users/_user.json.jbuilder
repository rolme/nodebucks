json.address user.address
json.admin user.admin? # NOTE: This info is not part of token (JWT)
json.avatar user.avatar
json.balances user.balances.each do |balance|
  json.hasNodes balance[:has_nodes]
  json.name balance[:name]
  json.pending do
    json.usd balance[:pending_usd]
    json.value balance[:pending_value]
  end
  json.slug balance[:slug]
  json.symbol balance[:symbol]
  json.usd balance[:usd]
  json.value balance[:value]
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
json.state user.state
json.updatedAt user.updated_at.to_formatted_s(:db)
json.zipcode user.zipcode
