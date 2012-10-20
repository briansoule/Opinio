class AddNumberToAnswer < ActiveRecord::Migration
  def change
    add_column :answers, :number, :string
  end
end
