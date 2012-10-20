class AddPollIdToAnswers < ActiveRecord::Migration
  def change
    add_column :answers, :poll_id, :integer
  end
end
