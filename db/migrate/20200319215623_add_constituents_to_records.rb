class AddConstituentsToRecords < ActiveRecord::Migration[5.2]
  def change
    add_column :records, :constituents, :text, array: true, default: []
  end
end
