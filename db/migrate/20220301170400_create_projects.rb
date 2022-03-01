class CreateProjects < ActiveRecord::Migration[6.1]
  def change
    create_table :projects do |t|
      t.integer :job_no
      t.string :job_name
      t.string :production_co
      t.string :agency
      t.string :client
      t.boolean :active
      t.integer :user_id

      t.timestamps
    end
  end
end
