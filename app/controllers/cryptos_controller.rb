class CryptosController < ApplicationController
  before_action :authenticate_admin_request, only: [:update]

  def index
    @cryptos = Crypto.all
  end

  def show
    @crypto = Crypto.find params[:slug]
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
