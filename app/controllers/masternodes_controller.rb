class MasternodesController < ApplicationController
  def index
    @masternodes = Crypto.select(:name, :description, :logo_url, :slug, :price, :url).all
  end

  def show
    @masternode = Crypto.find_by(slug: params[:slug])
  end
end
