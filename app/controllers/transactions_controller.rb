class TransactionsController < ApplicationController
  before_action :authenticate_admin_request, only: [:index]

  def index
    @transactions  = Transaction.includes(account: :user).all
  end
end
