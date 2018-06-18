Rails.application.routes.draw do
  scope :api, defaults: { format: :json } do
    resources :cryptos, only: [:index, :show], param: :slug
    resources :nodes, only: [:index, :show, :create, :update], param: :slug
    resources :users, only: [:index, :show, :create, :update, :destroy], param: :slug do
      get :confirm
      get :verify
      patch :reset_password
      patch :reset, on: :collection
    end
  end

  post 'auth/login', to: 'users#login'
  post 'auth/admin', to: 'users#admin_login'

  get '*path', to: 'application#index'
end
