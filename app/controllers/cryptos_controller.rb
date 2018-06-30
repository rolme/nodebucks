class CryptosController < ApplicationController
  def index
    @cryptos = Crypto.active
  end

  def show
    @crypto       = Crypto.find_by(slug: params[:slug])
    @show_roi     = true
    @show_pricing = true # current_user&.admin?

    if @current_user.present?
      # TODO: Figure out a way to store orders
      np = NodeManager::Pricer.new
      np.evaluate(@crypto)
      @orders = np.orders
    end
  end

end
