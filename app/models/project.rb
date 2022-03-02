class Project < ApplicationRecord
    belongs_to :user
    has_many :trips
    has_many :flights, through: :trips
end
