class CreateRewards < ActiveRecord::Migration[5.2]
  def change
    create_table :rewards do |t|
      t.references :node, foreign_key: true
      t.datetime :timestamp
      t.string :txhash
      t.decimal :amount

      t.timestamps
    end
  end
end
