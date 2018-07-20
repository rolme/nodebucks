Rails.application.routes.draw do
  scope :api, defaults: { format: :json } do
    resources :cryptos, only: [:index, :show], param: :slug
    resources :nodes, except: [:destroy, :edit, :new], param: :slug do
      patch :online
      patch :offline
      patch :purchase
      patch :reserve # Reserve sell price
      patch :sell
    end
    resources :users, except: [:edit, :new], param: :slug do
      get :confirm
      get :verify
      patch :reset_password
      patch :reset, on: :collection
    end
    resources :withdrawals, only: [:create, :index, :show, :update], param: :slug
  end

  post 'auth/login', to: 'users#login'
  post 'auth/admin', to: 'users#admin_login'

  get '*path', to: 'application#index'
end
