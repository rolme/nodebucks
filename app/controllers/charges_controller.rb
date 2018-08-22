class ChargesController < ApplicationController
  before_action :authenticate_request, only: [:create]
  before_action :set_customer, only: [:create]
  before_action :set_node, only: [:create]
  before_action :set_amount, only: [:create]

  def create
    charge = Stripe::Charge.create(
      customer: @customer.id,
      amount: @amount,
      description: "#{@node.name} masternode purchase at #{@amount}",
      currency: 'usd'
    )

    @node.sell!

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

  def set_node
    @node = current_user.reserved_node
  end

  def set_amount
    @amount = @node.cost_to_cents
    if @amount.zero?
      render 'purchase_error', status: :bad_request
    end
  end
end
