Rails.application.routes.draw do
  scope :api, defaults: { format: :json } do
    resources :cryptos, only: [:index, :show], param: :slug
    resources :users, only: [:index, :show, :create, :update, :destroy], param: :slug do
      get :confirm
      get :verify
      patch :reset_password
      patch :reset, on: :collection
    end
  end

  post 'auth/login', to: 'users#login'
end
