class Api::FavouritesController < ApplicationController
  def index
  end
  def new
    @favourite = Favourite.new
  end
  def create
    user = User.find_by(email: params[:email])
    favourites = []
    params[:country_name].each do |i|
      favourites << Favourite.new(user_id: user.id, country_name: i)
    end
    Favourite.import favourites    
   
    finishedSuccessfully = true
    favourites.each do |i|
      if not i.valid?
        render json: {errors: @favourite.errors.full_messages}, status: :not_acceptable
        finishedSuccessfully = false
        break
      end
    end

    if finishedSuccessfully
      render json: {favourite: @favourite}, notice: 'Favourites created!'
    end  

  end
  
end