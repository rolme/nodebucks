class WithdrawalManager
  attr_accessor :withdrawal
  attr_reader :crypto, :error, :user

  def initialize(user, my_withdrawal=nil)
    @user         = user
    @withdrawal   = my_withdrawal
    @withdrawal ||= Withdrawal.find_by(user_id: user.id, status: 'reserved')
    @withdrawal ||= Withdrawal.new(
      amount_btc: user.total_balance[:btc],
      amount_usd: user.total_balance[:usd],
      balances: user.balances,
      user_id: user.id,
      status: 'reserved'
    )
  end

  def update(params)
    case params[:status]
    when 'processed'; process
    when 'cancelled'; cancel
    when 'pending'; pending
    end
    withdrawal
  end

  def save(timestamp=DateTime.current)
    if withdrawal.id.present?
      withdrawal.amount_btc = user.total_balance[:btc]
      withdrawal.amount_usd = user.total_balance[:usd]
      withdrawal.balances   = user.balances
    end

    if withdrawal.save
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
    # TODO: Create transactions here
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
