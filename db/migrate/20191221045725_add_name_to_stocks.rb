class AddNameToStocks < ActiveRecord::Migration[5.2]
  def change
    add_column :stocks, :full_name, :string
  end
end
