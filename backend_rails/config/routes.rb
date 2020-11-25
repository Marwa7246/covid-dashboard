Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  namespace :api do
    resource :users, only: [:create, :show] do
    resources :favourites, only: [:create, :destroy] 
    end

    # resources :data
    resources :twilios , only: [:create]

    get '/users/:email', to: 'users#show'
    get '/users', to: 'users#index'
    delete '/users/favourites/:email', to: 'favourites#destroy'

  end


  get '/news' => '/news#index'
  

  post "/login", to: "auth#login"
  get "/auto_login", to: "auth#auto_login"
  get "/user_is_authed", to: "auth#user_is_authed"




end
