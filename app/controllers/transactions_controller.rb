class TransactionsController < ApplicationController
  before_action :authenticate_admin_request, only: [:index]

  def index
    @txs_pending = Transaction.pending.includes(account: :user).order(created_at: :desc).limit(params[:limit].to_i || 25).offset((params[:page].to_i || 0) * 25)
    @txs_processed = Transaction.processed.includes(account: :user).order(created_at: :desc).limit(params[:limit].to_i || 25).offset((params[:page].to_i || 0) * 25)
    @txs_cancelled = Transaction.cancelled.includes(account: :user).order(created_at: :desc).limit(params[:limit].to_i || 25).offset((params[:page].to_i || 0) * 25)
  end

  def update
    @transaction = Transaction.find(params[:id])
    if @transaction.update(transaction_params)
      render :show
    else
      render json: { status: 'error', message: @transaction.errors.full_messages.join(', ') }
    end
  end

  def transaction_params
    params.require(:transaction).permit(
      :status,
      :notes,
      :amount,
    )
  end
end
