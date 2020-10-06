class Api::TwiliosController < ApplicationController


  def create
    client = Twilio::REST::Client.new(ENV['TWILIO_ACCOUNT_SID'], ENV['TWILIO_AUTH_TOKEN'])

    user = User.find_by(email: params[:email])

    params['countries'].each do |p| 
    favourites = Favourite.find_by(country_name: p[:country], user_id: user[:id])
      if favourites
        client.messages.create(
          from: ENV['TWILIO_NUMBER'],
          to: user[:mobile],
          body: "Watch out  #{user[:first_name]}, COVID-19 cases have increased by #{p[:maxDifference]}% in #{favourites[:country_name]} #{p[:province]} in the last 7 days."
        )
      end
    end
  
 
  end


end



