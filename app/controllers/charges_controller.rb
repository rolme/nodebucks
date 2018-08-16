class ChargesController < ApplicationController
  def create
    # 1. Grab the current_user
    # 2. Get the reserved price for the node
    # 3. Define amount below in USD
    node    = current_user.reserved_node
    @amount = node&.cost

    customer = Stripe::Customer.create(
      :email => params[:stripeEmail],
      :source  => params[:stripeToken]
    )

    charge = Stripe::Charge.create(
      :customer    => customer.id,
      :amount      => @amount,
      :description => "#{node.name} masternode purchase at #{@amount}",
      :currency    => 'usd'
    )

  rescue Stripe::CardError => e
    flash[:error] = e.message
    redirect_to new_charge_path
  end

end
