class FlightsController < ApplicationController
     def update
        flight = Flight.find_by(id: params[:id])
        flight.update(passenger_params)
        render json: flight, status: :ok
    end

    private 

    def passenger_params
        params.permit(:id, :leg, :airline, :flight_no, :dep_airport, :dep_time, :arr_airport, :arr_time, :seat, :confirmation, :notes, :trip_id)
    end
end
