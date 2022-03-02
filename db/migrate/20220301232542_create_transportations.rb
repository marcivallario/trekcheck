class CreateTransportations < ActiveRecord::Migration[6.1]
  def change
    create_table :transportations do |t|
      t.string :direction
      t.datetime :date
      t.string :method
      t.string :confirmation
      t.text :notes
      t.integer :trip_id

      t.timestamps
    end
  end
end
