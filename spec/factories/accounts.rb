FactoryBot.define do
  factory :account do
    user
    association :crypto, factory: :bitcoin
    balance 1
    slug "swdawad248wad@#"
    wallet "2333"
    cached_crypto_symbol 'btc'
    cached_crypto_name "MyString"
  end
end
