class AddPositionToRecords < ActiveRecord::Migration[5.2]
  def change
    add_column :records, :position, :integer
  end
end
