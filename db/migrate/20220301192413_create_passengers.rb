class CreatePassengers < ActiveRecord::Migration[6.1]
  def change
    create_table :passengers do |t|
      t.integer :user_id
      t.string :legal_first_name
      t.string :legal_last_name
      t.string :nickname
      t.string :position
      t.string :department
      t.integer :cell
      t.string :email
      t.string :dob
      t.string :country_of_residence
      t.string :state_of_residence
      t.string :passport
      t.string :license
      t.string :tsa_precheck
      t.string :global_entry
      t.string :seat_assignment_pref

      t.timestamps
    end
  end
end
