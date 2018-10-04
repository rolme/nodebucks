module Reactable
  extend ActiveSupport::Concern

  included do
    before_action :define_asset_location
    layout "react"
  end

  def define_asset_location
    if Rails.env.production? || Rails.env.staging?
      path = '/app/public/index.html'
      page = Nokogiri::HTML(open(path))

      @css = page.css('link')[2].attributes["href"].value
      Rails.logger.info ">>>> script: #{page.css('script').count} #{page.css('script').inspect}"
      @js  = page.css('script')[2].attributes["src"].value
      Rails.logger.info ">>>>> css: #{@css}"
      Rails.logger.info ">>>>> js: #{@js}"
    end
  end
end
