class SupportMailer < ApplicationMailer
  def send_email(requester)
    @subject = requester.subject
    @message = requester.message
    @email = requester.email
    mail(
      content_type: "text/html",
      subject: "#{@email} contacted Nodebucks",
      to: ['support@nodebucks.com'],
      bcc: ['ron.parnaso@gmail.com', 'jay.severson@gmail.com']
    )
  end
end
