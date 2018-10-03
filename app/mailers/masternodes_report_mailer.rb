class MasternodesReportMailer < ApplicationMailer
  def send_report
    @nodes = Node.all
    @nodes_down = Node.down
    mail(
      content_type: "text/html",
      subject: 'Nodebucks - Daily Masternodes Summary',
      to: ['support@nodebucks.com'],
      bcc: ['ron.parnaso@gmail.com', 'jay.severson@gmail.com']
    )
  end
end
