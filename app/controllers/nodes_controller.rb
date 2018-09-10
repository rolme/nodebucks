class NodesController < ApplicationController
  before_action :authenticate_request, only: [:create, :index, :purchase, :reserve, :sell, :show, :update]
  before_action :authenticate_admin_request, only: [:offline, :online]

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

  def sell
    @node    = Node.find_by(slug: params[:node_slug])
    operator = NodeManager::Operator.new(@node)
    operator.sell
    @node.reload
    render :show
  end

  # INFO: Reserve the sell price of existing node
  def reserve
    @node    = Node.find_by(slug: params[:node_slug])
    operator = NodeManager::Operator.new(@node)
    operator.reserve_sell_price
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
    @node  = Node.find_by(slug: params[:node_slug], user_id: current_user.id)

    operator = NodeManager::Operator.new(@node)
    # TODO: Save PayPal payload as part of purchase
    operator.purchase(DateTime.current, params[:payment_response])
    @node.reload

    # TODO: This is a bit brittle, need to rethink this later
    # TODO: Only works if purchasing a NEW node
    ReceiptMailer.send_receipt(current_user, @node.cost.ceil(2), operator.order.slug).deliver_later
    render :show
  end

  def show
    @node   = Node.find_by(slug: params[:slug], user_id: current_user.id)
    @node ||= Node.find_by(slug: params[:slug]) if current_user.admin?
  end

  def update
    @node = Node.find_by(slug: params[:slug])
    if @node.update(current_user.admin? ? node_params : node_user_params)
      render :show
    else
      render json: { status: 'error', message: builder.error }
    end
  end

protected

  def node_user_params
    params.require(:node).permit(
      :reward_setting,
      :sell_setting,
      :sell_bitcoin_wallet,
      :withdraw_wallet
    )
  end

  def node_params
    params.require(:node).permit(
      :ip,
      :reward_setting,
      :sell_setting,
      :sell_bitcoin_wallet,
      :wallet,
      :withdraw_wallet,
      :version,
      :vps_provider,
      :vps_url,
      :vps_monthly_cost
    )
  end
end
