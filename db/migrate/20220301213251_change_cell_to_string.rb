class ChangeCellToString < ActiveRecord::Migration[6.1]
  def change
    change_column :passengers, :cell, :string
  end
end
