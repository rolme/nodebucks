class NodesController < ApplicationController
  before_action :authenticate_request, only: [:create, :index, :purchase, :show]
  before_action :authenticate_admin_request, only: [:offline, :online, :update]

  def create
    crypto  = Crypto.find_by(slug: params[:crypto])
    builder = NodeManager::Builder.new(@current_user, crypto)
    if builder.save
      @node = builder.node
      render :show
    else
      render json: { status: 'error', message: builder.error }
    end
  end

  def index
    @nodes   = Node.unreserved if current_user.admin? && params.has_key?(:all)
    @nodes ||= Node.unreserved.where(user_id: current_user.id)
  end

  def offline
    @node    = Node.find_by(slug: params[:node_slug])
    operator = NodeManager::Operator.new(@node)
    operator.offline
    @node.reload
    render :show
  end

  def online
    @node = Node.find_by(slug: params[:node_slug])
    if @node.ready?
      operator = NodeManager::Operator.new(@node)
      operator.online
      @node.reload
    end
    render :show
  end

  def purchase
    @node    = Node.find_by(slug: params[:node_slug], user_id: current_user.id)
    operator = NodeManager::Operator.new(@node)
    operator.purchase
    @node.reload
    render :show
  end

  def show
    @node   = Node.find_by(slug: params[:slug], user_id: current_user.id)
    @node ||= Node.find_by(slug: params[:slug]) if current_user.admin?
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
