class NodeSellPriceHistoryWorker
  include Sidekiq::Worker
  sidekiq_options retry: false, backtrace: true

  def perform(*args)
    Node.all.each do |node|
      NodeSellPriceHistory.create(node: node, value: node.value)
    end
  end
end
