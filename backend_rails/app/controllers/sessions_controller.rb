class SessionsController < ApplicationController

  def create
    puts params
    if user = User.authenticate_with_credentials(params[:email], params[:password])
      session[:user_id] = user.id
      redirect_to :root
    else
      @error_login='Invalid Username/password!'
      render :new, alert: @error_login
    end
  end

end
