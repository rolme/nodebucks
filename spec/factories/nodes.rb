FactoryBot.define do
  factory :node do
    user
    crypto
    account
    status [:offline, :online, :reserved, :sold, :new, :down].sample
    ip Faker::Internet.private_ip_v4_address
    cost Random.rand(1..100)
    online_at Faker::Date.between(20.days.ago, Date.today)
    sold_at Faker::Date.between(10.days.ago, Date.today)

    factory :node_with_rewards do
      after(:create) do |node|
        FactoryBot.create_list(:reward, 4, node: node, fee: 2)
      end
    end

    factory :reserved_node do
      status 'reserved'
    end
  end
end 
