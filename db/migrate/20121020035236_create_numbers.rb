class CreateNumbers < ActiveRecord::Migration
  def change
    create_table :numbers do |t|
      t.integer :number

      t.timestamps
    end
  end
end
