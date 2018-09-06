json.pending do
  json.partial! 'transaction', collection: @txs_pending, as: :transaction
end

json.processed do
  json.partial! 'transaction', collection: @txs_processed, as: :transaction
end

json.canceled do
  json.partial! 'transaction', collection: @txs_canceled, as: :transaction
end

json.pendingTotal Transaction.pending.size
json.processedTotal Transaction.processed.size
json.canceledTotal Transaction.canceled.size
