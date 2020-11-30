class Api::NewsController < ApplicationController

  skip_before_action :require_login
  # require 'news-api'



  def index
    # newsapi = News.new("93894a50640e4b77a88f4d1b8c720c4d")
    # top_headlines = newsapi.get_top_headlines(q: 'bitcoin',
    #   sources: 'bbc-news,the-verge',
    #   category: 'business',
    #   language: 'en',
    #   country: 'us')
    info = find_country()
    render json: info
  end

  private
  def request_api(url)
    response = Excon.get(
      url,
      # headers: {
      #   'apiKey' => '93894a50640e4b77a88f4d1b8c720c4d'
      # }
    )
    return nil if response.status != 200
    JSON.parse(response.body)
  end
  def find_country()
    request_api(
      "https://gnews.io/api/v4/top-headlines?token=#{ENV['NEWS_API_KEY']}&lang=en&country=ca&q=covid"
    )
  end
end
