Rails.application.routes.draw do
  scope :api, defaults: { format: :json } do
    resources :announcements, only: [:create] do
      get :last, on: :collection
    end
    resources :cryptos, only: [:index, :show, :update], param: :slug
    resources :nodes, except: [:edit, :new], param: :slug do
      patch :disburse
      patch :online
      patch :offline
      patch :purchase
      patch :reserve # Reserve sell price
      patch :restore
      patch :sell
      patch :undisburse
    end
    resources :masternodes, only: [:index, :show], param: :slug
    resources :orders, only: [:index, :show], param: :slug do
      patch :paid
      patch :unpaid
    end
    resources :users, except: [:edit, :new], param: :slug do
      get :balance, on: :collection
      get :confirm
      get :verify
      get :referrer, on: :collection
      patch :reset_password
      patch :verify_id_image
      patch :profile
      patch :approved
      patch :denied
      patch :enable_2fa
      patch :disable_2fa
      patch :reset, on: :collection
      post :impersonate, on: :member
      post :password_confirmation
      post :verification_image
      post :secret_2fa, on: :collection
    end
    resources :transactions, only: [:index, :update]
    resources :withdrawals, only: [:create, :index, :show, :update], param: :slug do
      patch :confirm, on: :collection
    end
    resources :contacts, only: [:index, :create] do
      patch :reviewed
    end
  end

  get '/counts', to: 'application#counts', defaults: { format: :json }
  post 'auth/login', to: 'users#login'
  post 'auth/admin', to: 'users#admin_login'
  post 'auth/oauth', to: 'users#callback'

  get '*path', to: 'application#index'
end
