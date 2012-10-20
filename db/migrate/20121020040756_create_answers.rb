class CreateAnswers < ActiveRecord::Migration
  def change
    create_table :answers do |t|
      t.boolean :affirmative

      t.timestamps
    end
  end
end
