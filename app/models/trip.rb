class Trip < ApplicationRecord
    belongs_to :passenger
    belongs_to :project
    has_many :flights
    has_many :transportations
    has_many :accommodations
end
