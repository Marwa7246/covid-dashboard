Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  namespace :api do
    resource :users
    resources :data
    resources :favourites
    resources :twilios

    get '/users/:email', to: 'users#show'
    get '/users', to: 'users#index'

  end


  get 'api/news' => 'news#index'
  

  post "/login", to: "auth#login"
  get "/auto_login", to: "auth#auto_login"
  get "/user_is_authed", to: "auth#user_is_authed"




end
