class AddTargetPaymentMethodToOrder < ActiveRecord::Migration[5.2]
  def change
    add_column :orders, :target, :string
    add_column :orders, :payment_method, :string
  end
end
