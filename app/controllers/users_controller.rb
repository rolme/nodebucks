class UsersController < ApplicationController
  before_action :authenticate_request, only: [:balance, :update, :destroy, :referrer, :password_confirmation]
  before_action :authenticate_admin_request, only: [:index, :show, :impersonate]
  before_action :set_affiliate_key, only: [:referrer]

  def callback
    @user = nil
    if user_params['facebook'].present?
      @user   = User.find_by(facebook: user_params[:facebook])
      @user ||= User.find_by(email: user_params[:email])
      @user&.update_attribute(:facebook, user_params[:facebook]) if @user&.facebook.blank?
    elsif user_params['google'].present?
      @user = User.find_by(google: user_params[:google])
      @user ||= User.find_by(email: user_params[:email])
      @user&.update_attribute(:google, user_params[:google]) if @user&.google.blank?
    elsif user_params['linkedin'].present?
      @user = User.find_by(linkedin: user_params[:linkedin])
      @user ||= User.find_by(email: user_params[:email])
      @user&.update_attribute(:linkedin, user_params[:linkedin]) if @user&.linkedin.blank?
    end

    Rails.logger.info ">>>>> user present: #{@user.present?}"
    if @user.present?
      sm = StorageManager.new
      avatar = sm.store_url(@user, user_params[:avatar])
      Rails.logger.info ">>>>> user: #{user_params[:avatar]}"
      @user.update_attribute(:avatar, avatar)
      render json: { status: :ok, token: generate_token, message: 'User logged in.' }
    else
      @user = User.new(user_params)

      Rails.logger.info ">>>>> user affiliate: #{referrer_params[:referrer_affiliate_key]}"
      @user.set_affiliate_referrers(
        referrer_params[:referrer_affiliate_key]
      ) if !referrer_params[:referrer_affiliate_key].blank?

      Rails.logger.info ">>>>> user present: #{@user.present?}"
      if @user.save
        sm = StorageManager.new
        avatar = sm.store_url(@user, user_params[:avatar])
        @user.update_attribute(:avatar, avatar)
        render json: { status: :ok, token: generate_token, message: 'User account created.' }
        if ENV['RAILS_ENV'] == 'development'
          RegistrationMailer.send_verify_email(@user).deliver_now
        else
          RegistrationMailer.send_verify_email(@user).deliver_later
        end
      else
        render json: { status: 'error', message: @user.errors.full_messages.join(', ')}
      end
    end
  end

  def index
    if !!params[:nonadmin]
      @users = User.where.not(email: nil).where(admin: [false, nil])
    else
      @users = User.where.not(email: nil)
    end
  end

  def login
    authenticate params[:email], params[:password]
  end

  def update
    @user = User.find_by(slug: params[:slug])
    if @user.blank?
      render json: { status: 'error', message: 'Could not find user.' }
      return
    end

    if !@user.authenticate(params[:current_password])
      render json: { status: 'error', message: 'Current password is incorrect.'}
      return
    end

    if @user.update(user_params)
      render json: { status: :ok, token: generate_token, message: 'User account updated.' }
    else
      render json: { status: 'error', message: @user.errors.full_messages.join(', ')}
    end
  end

  def reset
    @user = User.find_by(email: params[:email])
    if @user.present?
      @user.reset!
      if ENV['RAILS_ENV'] == 'development'
        RegistrationMailer.send_reset_email(@user).deliver_now
      else
        RegistrationMailer.send_reset_email(@user).deliver_later
      end
      render json: { status: :ok, message: 'Reset password email sent.' }
    else
      render json: { status: 'error', message: 'Email could not be found.' }
    end
  end

  def reset_password
    @user = User.find_by(reset_token: params[:user_slug])
    if @user.blank? || !@user.token_valid?
      @user&.delete_token!
      render json: { status: 'error', message: 'Reset token has expired' }
      return
    end

    if @user.change_password!(user_params[:password], user_params[:password_confirmation])
      render json: { status: :ok, token: generate_token, message: 'Password has been updated.' }
    else
      render json: { status: 'error', message: @user.error.full_messages.join(', ') }
    end
  end

  def admin_login
    user  = User.find_by(email: params[:email], admin: true)
    @user = user&.authenticate(params[:password])
    if @user.present?
      render json: {
        token: generate_token,
        message: 'Login Successful'
      }
    else
      render json: { status: 'error', message: 'Email/Password is incorrect.' }, status: :unauthorized
    end
  end

  def balance
    @user = current_user
    render :show
  end

  def referrer
    @referrer = current_user
    @tier1_referrals = User.where(affiliate_user_id_tier1: current_user.id)
    @tier2_referrals = User.where(affiliate_user_id_tier2: current_user.id)
    @tier3_referrals = User.where(affiliate_user_id_tier3: current_user.id)
  end

  def create
    @user = User.new(user_params)

    @user.set_affiliate_referrers(
      referrer_params[:referrer_affiliate_key]
    ) if !referrer_params[:referrer_affiliate_key].blank?

    if @user.save
      if ENV['RAILS_ENV'] == 'development'
        RegistrationMailer.send_verify_email(@user).deliver_now
      else
        RegistrationMailer.send_verify_email(@user).deliver_later
      end
      render json: { status: :ok, token: generate_token, message: 'User account created.' }
    else
      render json: { status: 'error', message: @user.errors.full_messages.join(', ')}
    end
  end

  def confirm
    @user = User.find_by(slug: params[:user_slug])
    if @user.present?
      @user.update_attribute(:confirmed_at, DateTime.current)
      render json: { status: :ok, token: generate_token, message: 'User registration confirmed.' }
    else
      render json: { status: 'error', message: "User could not be found."}
    end
  end

  def verify
    @user = User.find_by(slug: params[:user_slug])
    if @user&.verify_email!
      render json: { status: :ok, token: generate_token, message: 'User email has been verified.' }
    else
      render json: { status: 'error', message: (@user) ? @user.errors.full_messages.join(', ') : 'User cannot be found.' }
    end
  end

  def destroy
    if (current_user.slug == params[:slug])
      current_user.delete
      render json: { status: :ok, message: 'User account has been removed.' }
    else
      render json: { status: 'error', message: 'You cannot delete this account.' }
    end
  end

  def show
    @user = User.find_by(slug: params[:slug])
  end

  def authorized
    command = AuthorizedToken.call(params[:t])

    if command.success?
      render json: {
        token: params[:t],
        message: 'Valid Token'
      }
    else
      render json: { error: command.errors }, status: :unauthorized
    end
  end

  def password_confirmation
    user = User.find_by(slug: params[:user_slug])
    render json: { status: :ok, valid: user.authenticate(params[:user][:password]).present? }
  end

  def impersonate
    @user = User.find_by_slug(params[:slug])
    render json: { status: :ok, token: generate_token }
  end

protected

  def user_params
    params.require(:user).permit(
      :address,
      :avatar,
      :city,
      :country,
      :email,
      :facebook,
      :first,
      :google,
      :last,
      :linkedin,
      :new_email,
      :nickname,
      :password,
      :password_confirmation,
      :state,
      :zipcode,
    )
  end

  def referrer_params
    params.permit(:referrer_affiliate_key)
  end

private

  def set_affiliate_key
    @affiliate_key = current_user.affiliate_key
  end

  def authenticate(email, password)
    command = AuthenticateUser.call(email, password)

    if command.success?
      @user = command.user
      render json: {
        token: command.result,
        message: 'Login Successful'
      }
    else
      render json: { status: 'error', message: command.errors[:user_authentication] }, status: :unauthorized
    end
  end

  # TODO: This code also exists in authenticate_user.rb
  def generate_token
    JsonWebToken.encode({
      address: @user.address,
      avatar: @user.avatar,
      city: @user.city,
      confirmedAt: @user.confirmed_at&.to_formatted_s(:db),
      country: @user.country,
      createdAt: @user.created_at.to_formatted_s(:db),
      email: @user.email,
      first: @user.first,
      fullName: @user.full_name,
      last: @user.last,
      newEmail: @user.new_email,
      nickname: @user.nickname,
      slug: @user.slug,
      state: @user.state,
      updatedAt: @user.updated_at.to_formatted_s(:db),
      zipcode: @user.zipcode,
      admin: @user.admin,
    })
  end
end
