class SupportMailer < ApplicationMailer
  def send_email(subject, message)
    @subject = subject
    @message = message
    mail(
      content_type: "text/html",
      subject: subject,
      to: ['support@nodebucks.com'],
      bcc: ['ron.parnaso@gmail.com', 'jay.severson@gmail.com']
    )
  end
end
