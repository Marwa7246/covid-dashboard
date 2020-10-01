class Api::UsersController < ApplicationController

  def index
    users = User.all
    render json: users
  end

  skip_before_action :require_login, only: [:create, :show]

  def show
  end

  def create
    puts 'createeeeeeeeeeeeee'
    puts params
    user = User.create(user_params)
    # byebug

    if user.valid?
        payload = {user_id: user.id}
        token = encode_token(payload)
        puts token
        render json: {user: user, jwt: token}
    else
        render json: {errors: user.errors.full_messages}, status: :not_acceptable
    end
  end

  private 

  def user_params
    puts 'helllllllllllllllllloooooooooooooo'
    puts params
    params.permit(:first_name, :last_name, :email, :password, :mobile)
  end
end
