class OrdersController < ApplicationController
  before_action :authenticate_request, only: [:index]

  def index
    if current_user.admin?
      @orders = Order.includes(:node, :user)
                  .filter_by_node(params[:n])
                  .filter_by_user(params[:u])
    else
      @orders = Order.includes(:node, :user).where(user_id: current_user.id)
    end
  end
end
