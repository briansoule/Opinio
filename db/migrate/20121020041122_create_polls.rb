class CreatePolls < ActiveRecord::Migration
  def change
    create_table :polls do |t|
      t.string :name
      t.text :description

      t.timestamps
    end
  end
end
