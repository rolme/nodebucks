class MasternodesController < ApplicationController
  def index
    @masternodes = Crypto.select(:name, :description, :logo_url, :price, :url).all
  end
end
