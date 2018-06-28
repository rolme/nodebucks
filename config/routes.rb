Rails.application.routes.draw do
  scope :api, defaults: { format: :json } do
    resources :cryptos, only: [:index, :show], param: :slug
    resources :nodes, except: [:destroy, :edit, :new], param: :slug do
      patch :online
      patch :offline
    end
    resources :users, except: [:edit, :new], param: :slug do
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
