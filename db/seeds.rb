puts "Add cryptos:"
Crypto.create([
  { name: 'Bitcoin', symbol: 'btc', status: 'inactive', url: 'https://bitcoin.org/', ticker_url: 'https://api.coinmarketcap.com/v2/ticker/1/', stake: 0, block_reward: 0 },
  { name: 'Dash', symbol: 'dash', description: 'Dash markets itself as the digital cash of crypto currency, providing users, merchants, and businesses a faster and cheaper online payment platform than competing blockchains. The Dash protocol features instant transaction confirmations, anonymity equal to physical cash, incentivized full nodes, and an DAO governance model to handle disputes.', url: 'https://www.dash.org/', explorer_url: 'https://explorer.dash.org/address/', ticker_url: 'https://api.coinmarketcap.com/v2/ticker/131/', stake: 1000, block_reward: 1.80 },
  { name: 'ZCoin', symbol: 'xzc', description: 'Zcoin is the first full implementation of the Zerocoin Protocol, which allows users to have complete privacy via Zero-Knowledge cryptographic proofs. It is worth noting that Zcoin is unrelated to other cryptocurrencies utilizing the Zerocash Protocol. Although Zerocash is a development from Zerocoin, their respective implementations are not simple forks of each other, but rely on different cryptographic assumptions with various tradeoffs.', url: 'https://zcoin.io/', explorer_url: 'https://explorer.zcoin.io/address/', ticker_url: 'https://api.coinmarketcap.com/v2/ticker/1414/', stake: 1000, block_reward: 15.0 },
  { name: 'Polis', symbol: 'polis', description: 'Polis is a cryptocurrency for communities. People thrive when they can connect and trade freely. Polis uses advanced decentralized blockchain technology to solve major problems for our global community.', url: 'https://polispay.org/', explorer_url: 'https://explorer.polispay.org/address/', ticker_url: 'https://api.coinmarketcap.com/v2/ticker/2359/', stake: 1000, block_reward: 14.4 },
  { name: 'PIVX', symbol: 'pivx', status: 'inactive', description: 'PIVX is  a form of digital online money using blockchain technology that can be easily transferred all around the world in a blink of an eye with nearly non-existent transaction fees with market leading security & privacy.', url: 'https://pivx.org/', explorer_url: 'https://chainz.cryptoid.info/pivx/address.dws?', ticker_url: 'https://api.coinmarketcap.com/v2/ticker/1169/', stake: 10000, block_reward: 2.25 },
  { name: 'Stipend', symbol: 'spd', status: 'inactive', url: 'https://stipend.me/', explorer_url: 'http://explorer.stipend.me/address/', ticker_url: 'https://api.coinmarketcap.com/v2/ticker/2616/', stake: 5000, block_reward: 12.0 },
  { name: 'GoByte', symbol: 'gbx', description: 'GoByte (GBX) is a cryptocurrency based on Dash aimed at vendors to provide monetary services . GoByte uses masternodes to provide near-instant and secure payments as well as anonymous transactions.', status: 'active', url: 'https://www.gobyte.network/', explorer_url: 'https://explorer.gobyte.network/address/', ticker_url: 'https://api.coinmarketcap.com/v2/ticker/2200/', stake: 1000, block_reward: 10.5 },
])

puts "  - Create price lookup table"
Crypto.all.each do |crypto|
  [1, 10, 25, 50, 100, 250, 500, 1000, 2500, 5000, 10000].each do |amount|
    CryptoPrice.create(crypto_id: crypto.id, amount: amount)
  end
end

puts "  - Scrape crypto data"
CryptoScraper.run

puts "  - Price crypto"
NodeManager::Pricer.run

puts "Create system account:"
puts "  - add system user"
system_user = User.new(first: 'System', last: 'Account')
system_user.save(validate: false)
puts "  - add system accounts:"
Crypto.all.each do |crypto|
  User.system.accounts.create(crypto_id: crypto.id)
  puts "     * #{crypto.name} account added"
end

puts "Add users"
User.create([
  { admin: true, first: 'Ron', last: 'Parnaso', email: 'ron.parnaso@gmail.com', password: 'test', password_confirmation: 'test' },
  { admin: true, first: 'Jay', last: 'Severson', email: 'jay.severson@gmail.com', password: 'test', password_confirmation: 'test' },
  { admin: true, first: 'Rick', last: 'Jackman', email: 'jackmanrick@gmail.com', password: 'test', password_confirmation: 'test' },
  { admin: true, first: 'Kostya', last: 'Harutyunyan', email: 'harutyunyankostya@yahoo.com', password: 'test', password_confirmation: 'test' },
  { first: 'Test', last: 'User', email: 'test@nodebucks.com', password: 'test', password_confirmation: 'test' }
])

if ENV["RAILS_ENV"] != 'production'
  email = 'ron.parnaso@gmail.com'
  user = User.find_by(email: email)
  puts "Create masternodes for #{user.full_name}"
  puts "  - Polis node #1:"
  puts "    * Reserve a price"
  crypto = Crypto.find_by(name: 'Polis')
  node = NodeManager::Builder.new(user, crypto).save(DateTime.current - 6.months)
  puts "    * purchase for #{user.full_name} at #{node.cost}"
  operator = NodeManager::Operator.new(node)
  operator.purchase(DateTime.current - (6.months - 2.days), { source: 'seed' })
  puts "    * Set IP and wallet"
  node.ip     = '127.0.0.1'
  node.wallet = 'PKe7MGTEXaunMhSXwT2D88QEk8JLXbYn7u'
  node.save
  puts "    * put online"
  operator.online(DateTime.current - (6.months - 2.days))

  puts "  - Polis node #2:"
  node = NodeManager::Builder.new(user, crypto).save(DateTime.current - 3.months)
  puts "    * purchase for #{user.full_name} at #{node.cost}"
  operator = NodeManager::Operator.new(node)
  operator.purchase(DateTime.current - (3.months - 2.days), { source: 'seed' })
  puts "    * Set IP and wallet"
  node.ip     = '127.0.0.1'
  node.wallet = 'PUqHkjJPD8hFwTz9M1WhYtG9pBx14GcLHn'
  node.save
  puts "    * put online"
  operator.online(DateTime.current - (3.months - 2.days))

  puts "Gather rewards"
  NodeRewarder.run
end

puts "DONE"
