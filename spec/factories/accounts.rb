FactoryBot.define do
  factory :account do
    user
    association :crypto, factory: :bitcoin
    balance Random.rand(0..1000)
    sequence(:wallet) { |n| "PFyM75zUNrVUcK5XDcaT4moRuKTsnDqWa#{n}" }
    cached_crypto_symbol 'btc'
    cached_crypto_name "MyString"
  end
end
