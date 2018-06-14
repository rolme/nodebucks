class ApplicationController < ActionController::API
  attr_reader :current_user

  include ExceptionHandler

  def index
    render file: 'public/index.html', content_type: 'text/html'
  end

private

  def authenticate_request
    @current_user = AuthorizeApiRequest.call(request.headers).result
    render json: { error: 'Not Authorized' }, status: 401 unless @current_user
  end

  def authenticate_admin_request
    user = AuthorizeApiRequest.call(request.headers).result
    @current_user = user if user.admin?
    render json: { error: 'Not Authorized' }, status: 401 unless @current_user
  end
end
