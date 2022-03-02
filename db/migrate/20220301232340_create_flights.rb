class CreateFlights < ActiveRecord::Migration[6.1]
  def change
    create_table :flights do |t|
      t.string :leg
      t.string :airline
      t.string :flight_no
      t.string :dep_airport
      t.datetime :dep_time
      t.string :arr_airport
      t.datetime :arr_time
      t.string :seat
      t.string :confirmation
      t.text :notes
      t.integer :trip_id

      t.timestamps
    end
  end
end
