class WithdrawalsController < ApplicationController
  before_action :authenticate_request, only: [:create, :index, :show]
  before_action :authenticate_admin_request, only: [:update]

  def create
    withdrawal_manager = WithdrawalManager.new(current_user)
    if withdrawal_manager.save(withdrawal_params)
      @withdrawal = withdrawal_manager.withdrawal
      render :show
    else
      render json: { status: 'error', message: @withdrawal.error }
    end
  end

  def index
    @withdrawals   = Withdrawal.all if current_user.admin? && params.has_key?(:all)
    @withdrawals ||= Withdrawal.where(user_id: current_user.id)
  end

  def show
    @withdrawal = Withdrawal.find_by(slug: params[:slug])
  end

  def update
    withdrawal_manager = WithdrawalManager.new(current_user, withdrawal)
    if withdrawal_manager.update(admin_withdrawal_params)
      @withdrawal = withdrawal_manager.withdrawal
      render :show
    else
      render json: { status: 'error', message: withdrawal_manager.error }
    end
  end

protected

  def admin_withdrawal_params
    params.require(:withdrawal).permit(:status)
  end

  def withdrawal_params
    params.require(:withdrawal).permit(:amount, :symbol)
  end

  def withdrawal
    @withdrawal ||= Withdrawal.find_by(slug: params[:slug])
  end

end
