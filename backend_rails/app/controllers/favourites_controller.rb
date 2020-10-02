class Api::FavouritesController < ApplicationController

  def index
    
  end

  def new
    @favourite = Favourite.new
  end

  def create
    # @favourite = Favourite.new(favourite_params)
    user = User.find_by(email: params[:email])
    @favourite = Favourite.new(user_id: user.id, country_name: params[:country_name])

    if @favourite.save
      render json: {favourite: @favourite}, notice: 'Favourite created!'
    else
      render json: {errors: @favourite.errors.full_messages}, status: :not_acceptable
    end
  end


  private

  # def favourite_params
  #   puts 'testtttttttttttttttttttttttt'
  #   puts params
  #   params.permit(:country_name, :user_id)
  # end
end
