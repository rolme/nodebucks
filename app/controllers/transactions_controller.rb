class TransactionsController < ApplicationController
  before_action :authenticate_admin_request, only: [:index]

  def index
    @transactions  = Transaction.order(created_at: :desc)
  end
end
