class ReceiptMailer < ApplicationMailer
  def send_receipt(customer, cost, order)
    @customer = customer
    @cost = cost
    @order = order
    mail(
      :content_type => "text/html",
      :subject => 'Thank you for purchasing.',
      :to => @customer.email
    )
  end
end
