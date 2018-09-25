class NodesController < ApplicationController
  before_action :authenticate_request, only: [:create, :index, :purchase, :reserve, :sell, :show, :update]
  before_action :authenticate_admin_request, only: [:offline, :online, :disburse]

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
    if !@current_user.authenticate(params[:password])
      render json: { status: 'error', message: 'Password is incorrect.'}
      return
    end

    if node_user_params[:currency].blank? || node_user_params[:target].blank?
      render json: { status: 'error', message: 'Missing payment information.'}
      return
    end

    @node = Node.find_by(slug: params[:node_slug])
    operator = NodeManager::Operator.new(@node)
    if operator.sell(node_user_params[:currency], node_user_params[:target])
      SupportMailerService.send_node_sold_notification(current_user, @node)
    end
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

  def disburse
    @node = Node.find_by(slug: params[:node_slug])
    operator = NodeManager::Operator.new(@node)
    if operator.disburse
      @node.reload
      render :show
    else
      render json: { status: 'error', message: 'Unable to disburse funds. Is it sold?' }
    end
  end

  def undisburse
    @node = Node.find_by(slug: params[:node_slug])
    operator = NodeManager::Operator.new(@node)
    if operator.undisburse
      @node.reload
      render :show
    else
      render json: { status: 'error', message: 'Unable to undo disbursement. Was it disbursed?' }
    end
  end

  def purchase
    @node  = Node.find_by(slug: params[:node_slug], user_id: current_user.id)

    operator = NodeManager::Operator.new(@node)
    # TODO: Save PayPal payload as part of purchase
    if operator.purchase(DateTime.current, params[:payment_response])
      SupportMailerService.send_node_purchased_notification(current_user, @node)
    end

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
      :currency,
      :reward_setting,
      :sell_setting,
      :sell_bitcoin_wallet,
      :target,
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
