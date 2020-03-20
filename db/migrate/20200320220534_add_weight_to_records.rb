class AddWeightToRecords < ActiveRecord::Migration[5.2]
  def change
    add_column :records, :weight, :float
  end
end
