class CreateTrips < ActiveRecord::Migration[6.1]
  def change
    create_table :trips do |t|
      t.date :depart
      t.date :return
      t.boolean :itinerary_sent
      t.integer :project_id
      t.integer :passenger_id

      t.timestamps
    end
  end
end
