class UsersController < ApplicationController
  before_action :authenticate_request, only: [:balance, :update, :destroy]
  before_action :authenticate_admin_request, only: [:index, :show]

  def index
    @users = User.where.not(email: nil)
  end

  def login
    authenticate params[:email], params[:password]
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

  def create
    @user = User.new(user_params)
    if @user.save
      render json: { status: :ok, token: generate_token, message: 'User account created.' }
    else
      render json: { status: 'error', message: @user.errors.full_messages.join(', ')}
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

private

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
