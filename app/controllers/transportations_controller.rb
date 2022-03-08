class TransportationsController < ApplicationController
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
