class CryptosController < ApplicationController
  before_action :authenticate_admin_request, only: [:update]

  def index
    @cryptos = Crypto.all
  end

  def show
    @crypto       = Crypto.find_by(slug: params[:slug])
    @show_pricing = true
    @show_roi     = true

    # TODO: Figure out a way to store orders
    np = NodeManager::Pricer.new
    np.evaluate(@crypto)
    @orders = np.orders
  end

  def update
    @crypto = Crypto.find params[:slug]
    if @crypto.update(crypto_params)
      render 'show'
    else
      render json: { status: 'error', message: 'Could not update' }
    end
  end

protected

  def crypto_params
    params.require(:crypto).permit(:price)
  end

end
