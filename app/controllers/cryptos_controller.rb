class CryptosController < ApplicationController
  before_action :authenticate_request_optional, only: [:show]
  before_action :authenticate_admin_request, only: [:update]

  def index
    @cryptos = Crypto.active
  end

  def show
    @crypto   = Crypto.find_by(slug: params[:slug])
    @show_roi = true

    if params[:orders]&.to_bool && @current_user&.admin
      @show_pricing = true
      @orders

      np = NodeManager::Pricer.new(persist: true)
      np.evaluate(@crypto)
      @orders = np.orders
    end
  end

  def update
    @crypto = Crypto.find_by(slug: params[:slug])
    if @crypto.update(crypto_params)
      render :show
    else
      render json: { status: 'error', message: @crypto.error }
    end
  end

  private

  def crypto_params
    params.require(:crypto).permit(
      :description,
      :profile,
      :logo_url,
      :name,
      :status,
      :url,
    )
  end
end
