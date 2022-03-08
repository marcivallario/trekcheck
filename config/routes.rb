Rails.application.routes.draw do
  resources :accommodations
  resources :transportations
  resources :flights
  resources :trips
  resources :ffnumbers
  resources :passengers
  resources :projects
  get '/auth', to: 'users#show'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  post '/signup', to: 'users#create'
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
