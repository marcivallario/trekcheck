class Passenger < ApplicationRecord
    belongs_to :user
    has_many :ffnumbers 
    has_many :trips
end
