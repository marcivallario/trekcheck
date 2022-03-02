class AccommodationSerializer < ActiveModel::Serializer
  attributes :id, :checkin, :checkout, :name, :address_1, :address_2, :city, :state, :zip, :country, :confirmation, :phone, :notes, :trip_id
end
