require 'rails_helper'

RSpec.describe CryptoPriceHistory, type: :model do
  let!(:crypto_price_history) { FactoryBot.create(:crypto_price_history) }

  it { should belong_to(:crypto) }

  it 'is valid with valid attributes' do
    expect(crypto_price_history).to be_valid
  end
end
