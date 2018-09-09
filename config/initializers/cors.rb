# Be sure to restart your server when you modify this file.

# Avoid CORS issues when API is called from the frontend app.
# Handle Cross-Origin Resource Sharing (CORS) in order to accept cross-origin AJAX requests.

# Read more: https://github.com/cyu/rack-cors

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allowed_origins = (ENV['RAILS_ENV'] == 'production') ? ['https://nodebuckshq.com'] : '*'
  Rails.logger.info ">>>>> allowed_origins: #{allowed_origins}"
  Rails.logger.info ">>>>> RAILS_ENV: #{ENV['RAILS_ENV']}"

  allow do
    origins allowed_origins

    resource '*',
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head]
  end
end
