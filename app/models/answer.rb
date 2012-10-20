class Answer < ActiveRecord::Base
  attr_accessible :affirmative
  belongs_to :poll
end
