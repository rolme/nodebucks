class SiteMapWorker
  include Sidekiq::Worker
  sidekiq_options retry: false, backtrace: true

  def perform(*args)
    Nodebucks::Application.load_tasks
    Rake::Task['sitemap:generate'].invoke
  end
end
