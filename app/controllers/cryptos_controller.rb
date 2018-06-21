class CryptosController < ApplicationController
  before_action :authenticate_admin_request, only: [:update]

  def index
    @cryptos = Crypto.all
  end

  def show
    @crypto       = Crypto.find_by(slug: params[:slug])
    @show_roi     = true

    # TODO: Figure out a way to store orders
    np = NodeManager::Pricer.new
    np.evaluate(@crypto)
    @orders = np.orders
  end

end
