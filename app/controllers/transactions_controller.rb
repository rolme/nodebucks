class TransactionsController < ApplicationController
  before_action :authenticate_admin_request, only: [:index]

  def index
    @txs_pending = Transaction.pending.includes(account: :user).order(created_at: :desc).limit(15).offset(params[:pending_offset] || 0)
    @txs_processed = Transaction.processed.includes(account: :user).order(created_at: :desc).limit(15).offset(params[:processed_offset] || 0)
    @txs_canceled = Transaction.canceled.includes(account: :user).order(created_at: :desc).limit(15).offset(params[:canceled_offset] || 0)
  end
end
