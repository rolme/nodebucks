class NodeScraperWorker
  include Sidekiq::Worker
  sidekiq_options retry: false, backtrace: true

  def perform(*args)
    NodeScraper.run
  end
end
