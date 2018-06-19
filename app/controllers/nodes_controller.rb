class NodesController < ApplicationController
  before_action :authenticate_request, only: [:show, :create]
  before_action :authenticate_admin_request, only: [:index, :update]

  def index
    @nodes = Node.all
  end

  def show
    @node = Node.find_by(slug: params[:slug])
  end

  def create
    crypto  = Crypto.find_by(slug: params[:crypto])
    builder = NodeManager::Builder.new(@current_user, crypto, crypto&.node_price)
    if builder.save
      @node = builder.node
    else
      render json: { status: 'error', message: builder.error }
    end
  end

protected

  def node_params
    params.require(:node).permit(
      :ip,
      :version,
      :vps_provider,
      :vps_url,
      :vps_monthly_cost
    )
  end

end
