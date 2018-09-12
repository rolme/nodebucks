class CreateAffiliates < ActiveRecord::Migration[5.2]
  def change
    create_table :affiliates do |t|
      t.references :user, foreign_key: true
      t.decimal :amount
      t.boolean :withdrawed, default: false

      t.timestamps
    end
  end
end
