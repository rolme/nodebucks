module Reactable
  extend ActiveSupport::Concern

  included do
    before_action :define_asset_location
    layout "react"
  end

  def define_asset_location
    if Rails.env.production?
      path = '/app/public/index.html'
      page = Nokogiri::HTML(open(path))

      @css = page.css('link')[2].attributes["href"].value
      @js  = page.css('script')[0].attributes["src"].value
    end
  end
end
