class FlightsController < ApplicationController
    def create
        new_flight = Flight.create!(flight_params)
        render json: new_flight, status: :created
    end
    
    def update
        flight = Flight.find_by(id: params[:id])
        flight.update(flight_params)
        render json: flight, status: :ok
    end

    private 

    def flight_params
        params.permit(:id, :leg, :airline, :flight_no, :dep_airport, :dep_time, :arr_airport, :arr_time, :seat, :confirmation, :notes, :trip_id)
    end
end
