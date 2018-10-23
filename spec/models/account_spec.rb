require 'rails_helper'

RSpec.describe Account, type: :model do
  let!(:crypto) { FactoryBot.create(:bitcoin) }
  let(:account) { FactoryBot.create(:account) }

  it { should belong_to(:user) }
  it { should belong_to(:crypto) }
  it { should have_many(:nodes) }
  it { should have_many(:transactions) }

  it { should delegate_method(:slug).to(:crypto) }

  it 'is valid with valid attributes' do
    expect(account).to be_valid
  end
end
