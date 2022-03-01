class ProjectSerializer < ActiveModel::Serializer
  attributes :id, :job_no, :job_name, :production_co, :agency, :client, :active, :user_id
end
