puts "Add cryptos:"
Crypto.create([
  { name: 'Bitcoin', symbol: 'btc', status: 'inactive', url: 'https://bitcoin.org/', ticker_url: 'https://api.coinmarketcap.com/v2/ticker/1/', stake: 0 },
  { name: 'Dash', symbol: 'dash', url: 'https://www.dash.org/', explorer_url: 'https://explorer.dash.org/address/', ticker_url: 'https://api.coinmarketcap.com/v2/ticker/131/' },
  { name: 'ZCoin', symbol: 'xzc', url: 'https://zcoin.io/', explorer_url: 'https://explorer.zcoin.io/address/', ticker_url: 'https://api.coinmarketcap.com/v2/ticker/1414/' },
  { name: 'Polis', symbol: 'polis', url: 'https://polispay.org/', explorer_url: 'https://explorer.polispay.org/address/', ticker_url: 'https://api.coinmarketcap.com/v2/ticker/2359/' },
  { name: 'PIVX', symbol: 'pivx', url: 'https://pivx.org/', explorer_url: 'https://chainz.cryptoid.info/pivx/address.dws?', ticker_url: 'https://api.coinmarketcap.com/v2/ticker/1169/', stake: 10000 },
  { name: 'Stipend', symbol: 'spd', status: 'inactive', url: 'https://stipend.me/', explorer_url: 'http://explorer.stipend.me/address/', ticker_url: 'https://api.coinmarketcap.com/v2/ticker/2616/', stake: 5000 }
])
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

user = User.first
puts "Create masternodes for #{user.full_name}"
puts "  - Polis node #1:"
puts "    * Reserve a price"
crypto = Crypto.find_by(name: 'Polis')
node = NodeManager::Builder.new(user, crypto).save(DateTime.current - 6.months)
puts "    * purchase for #{user.full_name} at #{node.cost}"
operator = NodeManager::Operator.new(node)
operator.purchase(DateTime.current - (6.months - 2.days))
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
operator.purchase(DateTime.current - (3.months - 2.days))
puts "    * Set IP and wallet"
node.ip     = '127.0.0.1'
node.wallet = 'PUqHkjJPD8hFwTz9M1WhYtG9pBx14GcLHn'
node.save
puts "    * put online"
operator.online(DateTime.current - (3.months - 2.days))

puts "  - Polis node #3:"
node = NodeManager::Builder.new(user, crypto).save(DateTime.current - 2.months)
puts "    * purchase for #{user.full_name} at #{node.cost}"
operator = NodeManager::Operator.new(node)
operator.purchase(DateTime.current - (2.months - 2.days))
puts "    * Set IP and wallet"
node.ip     = '127.0.0.1'
node.wallet = 'PWsH4BFYFQPX8Z3qRmVRg6KhjGzuTyEawe'
node.save
puts "    * put online"
operator.online(DateTime.current - (2.months - 2.days))

puts "Gather rewards"
NodeScraper.run
#
# puts "Get daily node price"
# NodeDailyTicker.run
#
puts "DONE"
