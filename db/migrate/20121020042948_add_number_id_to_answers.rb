class AddNumberIdToAnswers < ActiveRecord::Migration
  def change
    add_column :answers, :number_id, :integer
  end
end
