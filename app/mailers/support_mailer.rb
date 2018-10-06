class SupportMailer < ApplicationMailer
  def send_email(subject, message)
    @subject = subject
    @message = message
    if Rails.env.production?
      mail(
        content_type: "text/html",
        subject: subject,
        to: ['support@nodebucks.com'],
        bcc: ['ron.parnaso@gmail.com', 'jay.severson@gmail.com']
      )
    elsif Rails.env.staging?
      mail(
        content_type: "text/html",
        subject: subject,
        to: ['roland.parnaso@gmail.com']
      )
    end
  end
end
