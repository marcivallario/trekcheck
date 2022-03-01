class CreateFfnumbers < ActiveRecord::Migration[6.1]
  def change
    create_table :ffnumbers do |t|
      t.string :airline
      t.string :number
      t.string :string
      t.integer :passenger_id

      t.timestamps
    end
  end
end
