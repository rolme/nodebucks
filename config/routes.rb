Rails.application.routes.draw do
  scope :api, defaults: { format: :json } do
    resources :cryptos, only: [:index], param: :slug
  end
end
