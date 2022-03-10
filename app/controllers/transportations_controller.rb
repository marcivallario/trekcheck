class TransportationsController < ApplicationController
    def create
        new_transpo = Transportation.create!(transpo_params)
        render json: new_transpo, status: :created
    end
    
    def update
        transpo = Transportation.find_by(id: params[:id])
        transpo.update(transpo_params)
        render json: transpo, status: :ok
    end

    private 

    def transpo_params
        params.permit(:id, :direction, :date, :trans_mode, :confirmation, :notes, :trip_id)
    end
end
