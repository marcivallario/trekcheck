class TransportationSerializer < ActiveModel::Serializer
  attributes :id, :direction, :date, :method, :confirmation, :notes, :trip_id
end
