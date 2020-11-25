class NewsController < ApplicationController

  skip_before_action :require_login
  


  def index
    info = find_country()
    render json: info
  end

  private
  def request_api(url)
    response = Excon.get(
      url,

    )
    return nil if response.status != 200
    JSON.parse(response.body)
  end
  def find_country()
    request_api(
      "https://disease.sh/v3/covid-19/historical?lastdays=30"
    )
  end
end
