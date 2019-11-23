class AddChangePriceToRecords < ActiveRecord::Migration[5.2]
  def change
    add_column :records, :change_price, :float
  end
end
