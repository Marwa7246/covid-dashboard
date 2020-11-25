class Api::NewsController < ApplicationController

  skip_before_action :require_login
  def index
    data = Datum.all
    render json: data
  end
end
