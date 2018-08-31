class OrdersController < ApplicationController
  before_action :authenticate_admin_request, only: [:index]

  def index
    @orders = Order.includes(:node, :user)
                .filter_by_node(params[:n])
                .filter_by_user(params[:u])
  end
end
