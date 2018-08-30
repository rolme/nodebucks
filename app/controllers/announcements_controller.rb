class AnnouncementsController < ApplicationController
  before_action :authenticate_admin_request, only: [:create]

  def create
    @announcement = Announcement.new(announcement_params)

    if @announcement.save
      render :show
    else
      render json: { status: :error, message: @contact.errors.full_messages.join(', ') }
    end
  end

  def last
    @announcement = Announcement.last

    if @announcement.nil?
      head :not_found
    else
      render :show
    end
  end

  private

  def announcement_params
    params.require(:announcement).permit(:text)
  end
end
