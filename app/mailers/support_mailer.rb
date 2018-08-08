class SupportMailer < ApplicationMailer
  def send_email(requester)
    @name = requester.name
    @message = requester.message
    @email = requester.email
    mail(
      content_type: "text/html",
      subject: "#{@name} contacted Nodebucks",
      to: 'info@nodebucks.com',
      bcc: ['ron.parnaso@gmail.com', 'jay.severson@gmail.com']
    )
  end
end
