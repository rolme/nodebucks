class UsersController < ApplicationController
  before_action :authenticate_request, only: [:show, :update, :destroy]
  before_action :authenticate_admin_request, only: [:index]

  def index
    @users = User.all
  end

  def login
    authenticate params[:email], params[:password]
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
      :avatar,
      :email,
      :email_on_login,
      :facebook,
      :first,
      :google,
      :last,
      :linkedin,
      :location,
      :new_email,
      :nickname,
      :password,
      :password_confirmation
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
end
