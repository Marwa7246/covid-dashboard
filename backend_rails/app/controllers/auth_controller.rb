class AuthController < ApplicationController

  skip_before_action :require_login, only: [:login, :auto_login]

  def login
      if user = User.authenticate_with_credentials(params[:email], params[:password])
        payload = {user_id: user.id}
        token = encode_token(payload)
        puts params
        favourites = Favourite.where(user_id: user.id).order(country_name: :asc).distinct
        render json: {user: user.slice(:id, :email, :first_name), jwt: token, favourites: favourites, success: "Welcome back, #{user.email}"}
    else
        render json: {failure: "Log in failed! Email or password invalid!"}
    end
  end

  def auto_login
    if session_user
      render json: session_user
    else
      render json: {errors: "No User Logged In"}
    end
  end

  def user_is_authed
    render json: {message: "You are authorized"}
  end


end
