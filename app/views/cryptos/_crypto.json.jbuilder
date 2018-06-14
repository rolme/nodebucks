json.annualRoi crypto.annual_roi
json.hostingFee crypto.percentage_hosting_fee
json.name crypto.name
json.nodePrice crypto.node_price
json.nodes crypto.nodes
json.slug crypto.slug
json.stake crypto.stake
json.symbol crypto.symbol
json.url crypto.url
json.status crypto.status

if @show_pricing
  json.estimatedNodePrice crypto.estimated_node_price
  json.flatSetupFee crypto.flat_setup_fee
  json.percentageConversionFee crypto.percentage_conversion_fee
  json.percentageHostingFee crypto.percentage_hosting_fee
  json.percentageSetupFee crypto.percentage_setup_fee
  json.price crypto.price
  json.purchasablePrice crypto.purchasable_price
end

if !!@orders
  json.orders @orders.each do |order|
    json.id order[:id]
    json.price order[:price]
    json.volume order[:volume]
    json.exchange order[:exchange]
  end
end
