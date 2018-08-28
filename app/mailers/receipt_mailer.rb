class ReceiptMailer < ApplicationMailer
  def send_receipt(customer, cost, invoice)
    @customer = customer
    @cost = cost
    @invoice = invoice
    mail(
      :content_type => "text/html",
      :subject => 'Thank you for purchasing.',
      :to => @customer.email
    )
  end
end
