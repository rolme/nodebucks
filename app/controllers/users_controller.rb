class UsersController < ApplicationController
  before_action :authenticate_request, only: [:balance, :update, :destroy, :referrer]
  before_action :authenticate_admin_request, only: [:index, :show]
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

    if @user.present?
      sm = StorageManager.new
      avatar = sm.store_url(@user, user_params[:avatar])
      @user.update_attribute(:avatar, avatar)
      render json: { status: :ok, token: generate_token, message: 'User logged in.' }
    else
      @user = User.new(user_params)
      
      @user.set_affiliate_referrers(
        referrer_params[:referrer_affiliate_key],
        referrer_params[:referred_time]
      ) if !referrer_params[:referrer_affiliate_key].blank? && !referrer_params[:referred_time].blank?

      if @user.save
        sm = StorageManager.new
        avatar = sm.store_url(@user, user_params[:avatar])
        @user.update_attribute(:avatar, avatar)
        render json: { status: :ok, token: generate_token, message: 'User account created.' }
        RegistrationMailer.send_verify_email(@user).deliver_later
      else
        render json: { status: 'error', message: @user.errors.full_messages.join(', ')}
      end
    end
  end

  def index
    @users = User.where.not(email: nil)
  end

  def login
    authenticate params[:email], params[:password]
  end

  def reset
    @user = User.find_by(email: params[:email])
    if @user.present?
      @user.reset!()
      RegistrationMailer.send_reset_email(@user).deliver_later
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
      referrer_params[:referrer_affiliate_key],
      referrer_params[:referred_time]
    ) if !referrer_params[:referrer_affiliate_key].blank? && !referrer_params[:referred_time].blank?

    if @user.save
      RegistrationMailer.send_verify_email(@user).deliver_later
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
      :zipcode
    )
  end

  def referrer_params
    params.permit(:referrer_affiliate_key, :referred_time)
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
      zipcode: @user.zipcode
    })
  end
end
