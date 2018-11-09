class SystemController < ApplicationController
  before_action :authenticate_admin_request, only: [:index, :setting]

  def index
  end

  def setting
  end

protected

  def setting_params
    params.require(:setting).permit(
      :key,
      :value
    )
  end

end
