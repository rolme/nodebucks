Rails.application.routes.draw do
  scope :api, defaults: { format: :json } do
    resources :announcements, only: [:create] do
      get :last, on: :collection
    end
    resources :cryptos, only: [:index, :show], param: :slug
    resources :nodes, except: [:destroy, :edit, :new], param: :slug do
      patch :online
      patch :offline
      patch :purchase
      patch :reserve # Reserve sell price
      patch :sell
    end
    resources :orders, only: [:index]
    resources :users, except: [:edit, :new], param: :slug do
      get :balance, on: :collection
      get :confirm
      get :verify
      get :referrer, on: :collection
      patch :reset_password
      patch :profile
      patch :reset, on: :collection
    end
    resources :transactions, only: [:index]
    resources :withdrawals, only: [:create, :index, :show, :update], param: :slug do
      patch :confirm, on: :collection
    end
    resources :contacts, only: [:index, :create] do
      patch :reviewed
    end
  end

  post 'auth/login', to: 'users#login'
  post 'auth/admin', to: 'users#admin_login'
  post 'auth/oauth', to: 'users#callback'

  get '*path', to: 'application#index'
end
