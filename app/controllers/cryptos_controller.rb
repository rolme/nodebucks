class CryptosController < ApplicationController
  before_action :authenticate_admin_request, only: [:update]

  def index
    @cryptos = Crypto.all
  end

  def show
    @crypto = Crypto.find_by(slug: params[:slug])
    api = Api::Cryptopia.new
    @latest_pruchasable_price = api.node_price(@crypto.symbol, @crypto.stake)
    @orders = api.orders
    @liquid = api.liquid?(@orders,  @crypto.stake)
    @path   = api.path
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
