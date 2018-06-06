json.annualRoi crypto.annual_roi
json.name crypto.name
json.nodePrice crypto.node_price
json.nodes crypto.nodes
json.price crypto.price
json.purchasablePrice crypto.purchasable_price
json.slug crypto.slug
json.stake crypto.stake
json.status crypto.status
json.symbol crypto.symbol
json.url crypto.url

if @orders
  json.isLiquid @liquid
  json.latestPurchasablePrice @latest_pruchasable_price
  json.path @path
  json.orders @orders.each do |order|
    json.id order[:id]
    json.price order[:price]
    json.volume order[:volume]
  end
end
