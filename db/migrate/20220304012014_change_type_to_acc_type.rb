class ChangeTypeToAccType < ActiveRecord::Migration[6.1]
  def change
    add_column :accommodations, :acc_type, :string
  end
end
