class RemoveNumberFromNumber < ActiveRecord::Migration
  def up
    remove_column :numbers, :number
  end

  def down
    add_column :numbers, :number, :integer
  end
end
