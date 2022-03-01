class ChangeJobNoDataType < ActiveRecord::Migration[6.1]
  def change
    change_column :projects, :job_no, :string
  end
end
