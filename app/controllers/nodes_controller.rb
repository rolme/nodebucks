class NodesController < ApplicationController
  before_action :authenticate_request, only: [:create, :index, :purchase, :reserve, :sell, :show, :update]
  before_action :authenticate_admin_request, only: [:offline, :online]
  before_action :set_customer, only: [:purchase]

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
    @node    = Node.find_by(slug: params[:node_slug], user_id: current_user.id)
    charge = Stripe::Charge.create(
      customer: @customer.id,
      amount: (@node.cost.ceil * 100).to_i,
      description: "#{@node.name} masternode purchase at #{@node.cost}",
      currency: 'usd'
    )
    operator = NodeManager::Operator.new(@node)
    operator.purchase
    @node.reload

    ReceiptMailer.send_receipt(current_user, @node.cost.round(2), charge.invoice).deliver_later

    render :show

  rescue Stripe::CardError => e
    render json: { status: 'error', message: 'Card Error' }
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
      :stripe,
      :withdraw_wallet
    )
  end

  def node_params
    params.require(:node).permit(
      :ip,
      :reward_setting,
      :sell_setting,
      :sell_bitcoin_wallet,
      :stripe,
      :wallet,
      :withdraw_wallet,
      :version,
      :vps_provider,
      :vps_url,
      :vps_monthly_cost
    )
  end

  def set_customer
    @customer = Stripe::Customer.create(
      email: current_user.email,
      source: params[:stripeToken]
    )
  end
end
