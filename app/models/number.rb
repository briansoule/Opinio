class Number < ActiveRecord::Base
  attr_accessible :number
  has_many :answers
end
