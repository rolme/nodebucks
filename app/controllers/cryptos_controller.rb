class CryptosController < ApplicationController
  def index
    @cryptos = Crypto.all
  end

  def show
    @crypto       = Crypto.find_by(slug: params[:slug])
    @show_roi     = true
    @show_pricing = true # current_user&.admin?

    # TODO: Figure out a way to store orders
    np = NodeManager::Pricer.new
    np.evaluate(@crypto)
    @orders = np.orders
  end

end
