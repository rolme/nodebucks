FactoryBot.define do
  factory :crypto do
    sequence(:symbol) { |n| "MN#{n}" }
    sequence(:name) { |n| "Masternode Coin #{n}" }

    factory :dash do
      symbol "DASH"
      name "Dash"
    end
  end
end
