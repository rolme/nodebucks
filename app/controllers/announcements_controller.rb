class AnnouncementsController < ApplicationController
  before_action :authenticate_admin_request, only: [:create]

  def create
    @announcement = Announcement.new(announcement_params)

    if @announcement.save
      render :show
    else
      render json: { status: "error" }
    end
  end

  def show
    @announcement = Announcement.last
  end

  private

  def announcement_params
    params.require(:announcement).permit(:text)
  end
end
