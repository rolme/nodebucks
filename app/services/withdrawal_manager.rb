class WithdrawalManager
  attr_accessor :withdrawal
  attr_reader :crypto, :error, :user

  def initialize(user, my_withdrawal=nil)
    @user         = user
    @withdrawal   = my_withdrawal
    @withdrawal ||= Withdrawal.new(user_id: user.id)
  end

  def update(params)
    case params[:status]
    when 'processed'; process
    when 'cancelled'; cancel
    when 'pending'; pending
    end
    withdrawal
  end

  def save(params)
    withdrawal.amount = params[:amount]
    withdrawal.symbol = params[:symbol]

    if withdrawal.save
      # TODO: Should we do some kind of log?
      withdrawal
    else
      @error = withdrawal.errors.full_messages.join(', ')
      false
    end
  end

protected

  def cancel
    @withdrawal.update_attributes(
      last_modified_by_admin_id: user.id,
      cancelled_at: DateTime.current,
      status: 'cancelled'
    )
  end

  def pending
    @withdrawal.update_attributes(
      last_modified_by_admin_id: user.id,
      status: 'pending'
    )
  end

  def process
    # TODO: It should get latest transactions and see if amount was processed
    #       before allowing it through
    @withdrawal.update_attributes(
      last_modified_by_admin_id: user.id,
      processed_at: DateTime.current,
      status: 'processed'
    )
  end

end
