json.amount order.amount
json.currency order.currency
json.description order.description
json.user do
  json.partial! 'users/basic', user: order.user
end
json.node do
  json.partial! 'nodes/basic', node: order.node
end
json.orderId order.slug
json.orderType order.order_type
json.paymentMethod payment_method
json.status order.status
json.slug order.slug
json.target target
