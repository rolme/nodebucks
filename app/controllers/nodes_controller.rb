class NodesController < ApplicationController
  before_action :authenticate_request, only: [:create, :index, :show]
  before_action :authenticate_admin_request, only: [:offline, :online, :update]

  def create
    crypto  = Crypto.find_by(slug: params[:crypto])
    builder = NodeManager::Builder.new(@current_user, crypto, crypto&.node_price)
    if builder.save
      @node = builder.node
    else
      render json: { status: 'error', message: builder.error }
    end
  end

  def index
    @nodes   = Node.all if current_user.admin?
    @nodes ||= Node.where(user_id: current_user.id)
  end

  def offline
    @node = Node.find_by(slug: params[:node_slug])
    @node.update_attribute(:status, 'offline')
    render :show
  end

  def online
    @node = Node.find_by(slug: params[:node_slug])
    if @node.ready?
      @node.update_attribute(:status, 'online')
    end
    render :show
  end

  def show
    @node = Node.find_by(slug: params[:slug])
  end

  def update
    @node = Node.find_by(slug: params[:slug])
    if @node.update(node_params)
      render :show
    else
      render json: { status: 'error', message: builder.error }
    end
  end

protected

  def node_params
    params.require(:node).permit(
      :ip,
      :wallet,
      :version,
      :vps_provider,
      :vps_url,
      :vps_monthly_cost
    )
  end

end
