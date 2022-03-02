class PassengersController < ApplicationController
    def index 
        current_user = User.find_by(id: session[:user_id])
        if (current_user) 
            render json: current_user.passengers
        else 
            render json: {error: "User not authorized"}, status: :unauthorized
        end
    end
end
