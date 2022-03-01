class PassengerSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :legal_first_name, :legal_last_name, :nickname, :position, :department, :cell, :email, :dob, :country_of_residence, :state_of_residence, :passport, :license, :tsa_precheck, :global_entry, :seat_assignment_pref
end
