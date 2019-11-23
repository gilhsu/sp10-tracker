class CreateRecords < ActiveRecord::Migration[5.2]
  def change
    create_table :records do |t|
      t.date :date, null:false
      t.float :price
      t.float :change_percent, null:false
      t.references :stock, foreign_key: true, null: false

      t.timestamps
    end
  end
end
