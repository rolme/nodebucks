class ChargesController < ApplicationController
  before_action :authenticate_request, only: [:create]
  before_action :set_customer, only: [:create]

  def create
    @node  = Node.find_by(slug: params[:slug], user_id: current_user.id, status: 'reserved')
    charge = Stripe::Charge.create(
      customer: @customer.id,
      amount: @node.cost,
      description: "#{@node.name} masternode purchase at #{@node.cost}",
      currency: 'usd'
    )
    operator = NodeManager::Operator.new(@node)
    operator.purchase
    @node.reload

    render json: { status: 'ok' }

  rescue Stripe::CardError => e
    render json: { status: 'error', message: 'Card Error' }
  end

  private

  def set_customer
    @customer = Stripe::Customer.create(
      email: current_user.email,
      source: params[:stripeToken]
    )
  end
end
