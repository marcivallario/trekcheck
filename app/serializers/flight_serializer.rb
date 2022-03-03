class FlightSerializer < ActiveModel::Serializer
  attributes :id, :leg, :airline, :flight_no, :dep_airport, :dep_time, :arr_airport, :arr_time, :seat, :confirmation, :notes, :trip_id

  belongs_to :trip
end
