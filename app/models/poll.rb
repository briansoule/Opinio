class Poll < ActiveRecord::Base
  attr_accessible :description, :name
  has_many :answers
end
