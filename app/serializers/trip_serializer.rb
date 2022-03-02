class TripSerializer < ActiveModel::Serializer
  attributes :id, :depart, :return, :itinerary_sent, :project_id, :passenger_id

  belongs_to :project
  belongs_to :passenger
  has_many :flights
  has_many :accommodations
  has_many :transportations
end
