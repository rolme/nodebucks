require 'rails_helper'

RSpec.describe User, type: :model do
  let!(:crypto) { FactoryBot.create(:bitcoin) }
  let(:users) { FactoryBot.create_list(:user, 5) }
  let(:referrer) { FactoryBot.create(:user) }

  it 'is valid with affiliate key' do
    users.each do |user|
      expect(user.affiliate_key).not_to eq(nil)
    end
  end

  describe '#set_affiliate_referrers' do
    context 'affiliate key is valid' do
      it 'sets referrer tier 1' do
        users.first.set_affiliate_referrers(referrer.affiliate_key)
        expect(users.first.affiliate_user_id_tier1).to eq(referrer.id)
      end
    end
    context 'affiliate key is not valid' do
      it 'does not set referrer' do
        users.last.set_affiliate_referrers('random_affiliate_key')
        expect(users.last.affiliate_user_id_tier1).to eq(nil)
      end
    end
  end
end
