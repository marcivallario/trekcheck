class ApplicationController < ActionController::API
  include ActionController::Cookies

  def auth
    current_user = User.find_by(id: session[:user_id])
  end
end
