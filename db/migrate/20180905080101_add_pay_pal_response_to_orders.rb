class AddPayPalResponseToOrders < ActiveRecord::Migration[5.2]
  def change
    add_column :orders, :paypal_response, :text
  end
end
