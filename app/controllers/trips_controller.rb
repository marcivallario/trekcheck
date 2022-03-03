class TripsController < ApplicationController
    def index 
        current_user = User.find_by(id: session[:user_id])
        if (current_user) 
            byebug
            # render json: current_user.trips, includes: [:passenger, :project]
            render json: current_user.trips
        else 
            render json: {error: "User not authorized"}, status: :unauthorized
        end
    end

    def show
        trip = Passenger.find(params[:id])
        render json: passenger, status: :ok
    end

    def create 
        auth_user = auth
        selected_project = auth_user.projects.find_by(id: params[:project_id])
        new_trip = selected_project.trips.create!(trips_params)
        render json: new_trip, status: :created
    end

    def destroy
        trip = Trip.find_by!(id: params[:id])
        trip.destroy
        head :no_content
    end

    private

    def trips_params
        params.permit(:depart, :return, :itinerary_sent, :passenger_id);
    end
end
