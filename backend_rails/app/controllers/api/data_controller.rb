class Api::DataController < ApplicationController

  def index
    data = Datum.all
    render json: data
  end 
end
