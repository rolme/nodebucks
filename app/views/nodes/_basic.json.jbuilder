json.cost node.cost
json.createdAt node.created_at.to_formatted_s(:db)
json.crypto do
  json.partial! 'cryptos/basic', crypto: node.crypto
end
json.slug node.slug
json.status node.status
json.value node.value
