class Api::UsersController < ApplicationController

  skip_before_action :require_login, only: [:create, :show]

  # def index
  #   users = User.all
  #   render json: users
  # end


  def show
    puts params
    user = User.find_by(email: params[:email])
    favourites = Favourite.where(user_id: user.id)
    render json: favourites

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
    params.require.permit(:first_name, :last_name, :email, :password, :mobile)
  end
end
