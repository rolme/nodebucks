FactoryBot.define do
  factory :node do
    user
    crypto
    account
    status "MyString"
    ip "MyString"
    cost "9.99"
    created_by_admin_id 1
    online_at "2018-06-15 14:20:51"
    sold_at "2018-06-15 14:20:51"
    version "MyString"
    last_upgraded_at "2018-06-15 14:20:51"
    wallet 'ww'
    vps_provider "MyString"
    vps_url "MyString"
    vps_monthly_cost "9.99"

    factory :reserved_node do
      status 'reserved'
    end
  end
end
