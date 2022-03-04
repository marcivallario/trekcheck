class TransportationSerializer < ActiveModel::Serializer
  attributes :id, :direction, :date, :trans_mode, :confirmation, :notes, :trip_id

  belongs_to :trip
end
