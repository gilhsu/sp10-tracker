class AddWeightToStocks < ActiveRecord::Migration[5.2]
  def change
    add_column :stocks, :weight, :float
  end
end
