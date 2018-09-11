class CryptosController < ApplicationController
  before_action :authenticate_request_optional, only: [:show]

  def index
    @cryptos = Crypto.active
  end

  def show
    @crypto   = Crypto.find_by(slug: params[:slug])
    @show_roi = true

    if !!params[:orders] && @current_user&.admin
      @show_pricing = true
      @orders

      np = NodeManager::Pricer.new(persist: true)
      np.evaluate(@crypto)
      @orders = np.orders
    end
  end
end
