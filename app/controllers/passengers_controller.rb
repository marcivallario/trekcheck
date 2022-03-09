class PassengersController < ApplicationController
    def index 
        current_user = User.find_by(id: session[:user_id])
        if (current_user) 
            render json: current_user.passengers
        else 
            render json: {error: "User not authorized"}, status: :unauthorized
        end
    end

    def show
        passenger = Passenger.find(params[:id])
        render json: passenger, status: :ok
    end

    def create 
        auth_user = auth
        new_passenger = auth_user.passengers.create!(passenger_params)
        render json: new_passenger, status: :created
    end

    def update
        passenger = Passenger.find_by(id: params[:id])
        passenger.update(passenger_params)
        render json: passenger, status: :ok
    end

    def destroy
        passenger = Passenger.find_by!(id: params[:id])
        passenger.trips.destroy_all
        passenger.destroy
        head :no_content
    end

    private
    
    def passenger_params
        params.permit(:user_id, :legal_first_name, :legal_last_name, :nickname, :position, :department, :cell, :email, :dob, :country_of_residence, :state_of_residence, :passport, :license, :tsa_precheck, :global_entry, :seat_assignment_pref)
    end
end
