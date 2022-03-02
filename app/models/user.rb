class User < ApplicationRecord
    has_secure_password
    has_many :projects
    has_many :passengers
    has_many :trips, through: :projects
end
