class ChargesController < ApplicationController
  before_action :authenticate_request, only: [:create]

  def create
    # 1. Grab the current_user
    # 2. Get the reserved price for the node
    # 3. Define amount below in USD
    node    = current_user.reserved_node
    @amount = node.cost_to_cents

    customer = Stripe::Customer.create(
      email: current_user.email,
      source: params[:stripeToken]
    )

    charge = Stripe::Charge.create(
      customer: customer.id,
      amount: @amount,
      description: "#{node.name} masternode purchase at #{@amount}",
      currency: 'usd'
    )

    render json: { status: 'ok' }

  rescue Stripe::CardError => e
    render json: { status: 'error', message: 'Card Error' }
  end

end
