FactoryBot.define do
  factory :account do
    user nil
    crypto nil
    balance "9.99"
    cached_crypto_symbol "MyString"
    cached_crypto_name "MyString"
  end
end
