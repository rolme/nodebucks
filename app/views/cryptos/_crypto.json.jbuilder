json.annualRoi crypto.yearly_roi[:percentage]
json.hostingFee crypto.percentage_hosting_fee
json.masternodes crypto.masternodes
json.monthlyRoiValue crypto.monthly_roi[:value]
json.monthlyRoiPercentage crypto.monthly_roi[:percentage]
json.name crypto.name
json.nodePrice crypto.node_price
json.slug crypto.slug
json.stake crypto.stake
json.symbol crypto.symbol
json.url crypto.url
json.status crypto.status
json.weeklyRoiValue crypto.weekly_roi[:value]
json.weeklyRoiPercentage crypto.weekly_roi[:percentage]
json.yearlyRoiValue crypto.yearly_roi[:value]
json.yearlyRoiPercentage crypto.yearly_roi[:percentage]

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
