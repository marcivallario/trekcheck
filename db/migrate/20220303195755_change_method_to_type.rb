class ChangeMethodToType < ActiveRecord::Migration[6.1]
  def change
    rename_column :transportations, :method, :trans_mode
  end
end
