class PassengersController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response

    def index 
        current_user = User.find_by(id: session[:user_id])
        if (current_user) 
            render json: current_user.passengers
        else 
            render json: {error: "User not authorized"}, status: :unauthorized
        end
    end

    def create 
        auth_user = auth
        new_passenger = auth_user.passengers.create!(passenger_params)
        render json: new_passenger, status: :created
    end

    def destroy
        passenger = Passenger.find_by!(id: params[:id])
        passenger.destroy
        head :no_content
    end

    private 

    def render_unprocessable_entity(invalid)
        render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end

    def render_not_found_response
        render json: { error: "Passenger not found" }, status: :not_found
    end
    
    def passenger_params
        params.permit(:user_id, :legal_first_name, :legal_last_name, :nickname, :position, :department, :cell, :email, :dob, :country_of_residence, :state_of_residence, :passport, :license, :tsa_precheck, :global_entry, :seat_assignment_prefk)
    end
end
