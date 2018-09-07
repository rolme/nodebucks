class OrdersController < ApplicationController
  before_action :authenticate_request, only: [:index]
  before_action :find_order, only: [:paid, :unpaid]

  def index
    if current_user.admin?
      @orders = Order.includes(:node, :user)
                  .filter_by_node(params[:n])
                  .filter_by_user(params[:u])
    else
      @orders = Order.includes(:node, :user).where(user_id: current_user.id)
    end
  end

  def paid
    @order.paid!
  end

  def unpaid
    @order.unpaid!
  end

  private

  def find_order
    @order = Order.find_by_slug(params[:order_slug])
  end
end
