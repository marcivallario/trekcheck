class TripSerializer < ActiveModel::Serializer
  attributes :id, :depart, :return, :itinerary_sent, :project_id, :passenger_id
end
