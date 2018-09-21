class NodeRewarder

  def self.run
    self.scrape
  end

  def self.scrape(a_node=nil)
    nodes = (a_node.present?) ? [a_node] : Node.online

    Rails.logger.info "[REWARDER]: Number of nodes: #{nodes.count}"
    nodes.each do |node|
      scraper = NodeManager::Rewarder.new(node)
      scraper.scrape
      Rails.logger.info "[REWARDER]: Scraped: #{node.id}"
    end
  end
end
