class ProjectsController < ApplicationController
    def index 
        current_user = User.find_by(id: session[:user_id])
        if (current_user) 
            render json: current_user.projects
        else 
            render json: {error: "User not authorized"}, status: :unauthorized
        end
    end

    def create
        auth_user = auth
        new_project = auth_user.projects.create!(project_params)
        render json: new_project, status: :created
    end

    def destroy
        project = Project.find_by!(id: params[:id])
        project.destroy
        head :no_content
    end

    private

    def project_params
        params.permit(:job_no, :job_name, :production_co, :agency, :client, :active, :user_id)
    end
end
