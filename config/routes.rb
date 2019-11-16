Rails.application.routes.default_url_options[:host] = 'sp10-tracker.herokuapp.com'


Rails.application.routes.draw do
  root 'homes#index'
  devise_for :users
  
  resources :fetch, only: [:index]
  namespace :api do
    namespace :v1 do
      resources :fetch, only: [:create]
    end
  end
  get '*path' => 'homes#index'
end
