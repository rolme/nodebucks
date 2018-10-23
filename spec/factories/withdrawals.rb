FactoryBot.define do
  factory :withdrawal do
    user
    crypto
    amount_btc 9.99
    status "MyString"
    last_modified_by_admin_id 1
    processed_at "2018-07-20 12:56:58"
    cancelled_at "2018-07-20 12:56:58"

    factory :user_with_subscription do
      after(:create) do |withdrawal|
        FactoryBot.create(:bitcoin, withdrawal: withdrawal)
      end
    end
  end
end
