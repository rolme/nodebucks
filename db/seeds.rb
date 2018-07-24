puts "Add users"
User.create([
  { admin: true, first: 'Ron', last: 'Parnaso', email: 'ron.parnaso@gmail.com', password: 'test', password_confirmation: 'test' },
  { admin: true, first: 'Jay', last: 'Severson', email: 'jay.severson@gmail.com', password: 'test', password_confirmation: 'test' },
  { admin: true, first: 'Rick', last: 'Jackman', email: 'jackmanrick@gmail.com', password: 'test', password_confirmation: 'test' },
  { admin: true, first: 'Kostya', last: 'Harutyunyan', email: 'harutyunyankostya@yahoo.com', password: 'test', password_confirmation: 'test' },
  { first: 'Test', last: 'User', email: 'test@nodebucks.com', password: 'test', password_confirmation: 'test' }
])

puts "Add cryptos"
Crypto.create([
  { name: 'Dash', symbol: 'dash', status: 'active', url: 'https://www.dash.org/', explorer_url: 'https://explorer.dash.org/address/', ticker_url: 'https://api.coinmarketcap.com/v2/ticker/131/', stake: 1000 },
  { name: 'ZCoin', symbol: 'xzc', status: 'active', url: 'https://zcoin.io/', explorer_url: 'https://explorer.zcoin.io/address/', ticker_url: 'https://api.coinmarketcap.com/v2/ticker/1414/', stake: 1000 },
  { name: 'Polis', symbol: 'polis', status: 'active', url: 'https://polispay.org/', explorer_url: 'https://explorer.polispay.org/address/', ticker_url: 'https://api.coinmarketcap.com/v2/ticker/2359/', stake: 1000 },
  { name: 'PIVX', symbol: 'pivx', status: 'active', url: 'https://pivx.org/', explorer_url: 'https://chainz.cryptoid.info/pivx/address.dws?', ticker_url: 'https://api.coinmarketcap.com/v2/ticker/1169/', stake: 10000 },
  { name: 'Stipend', symbol: 'spd', status: 'false', url: 'https://stipend.me/', explorer_url: 'http://explorer.stipend.me/address/', ticker_url: 'https://api.coinmarketcap.com/v2/ticker/2616/', stake: 5000 }
])

puts "  - Scrape crypto data..."
CryptoScraper.run

puts "  - Price crypto..."
NodeManager::Pricer.run

user = User.first
puts "Create nodes for #{user.full_name}"
# TODO: Need another API to pull orders for Stipend
# puts "  - Stipend node..."
# crypto = Crypto.find_by(name: 'Stipend')
# node = NodeManager::Builder.new(user, crypto).save(DateTime.current - 6.months)
# node.ip     = '127.0.0.1'
# node.wallet = ''
# node.save
# operator = NodeManager::Operator.new(node)
# puts "    - purchase..."
# operator.purchase(DateTime.current - (6.months - 2.days))
# puts "    - put online..."
# operator.online(DateTime.current - (6.months - 2.days))

puts "  - Polis node..."
crypto = Crypto.find_by(name: 'Polis')
node = NodeManager::Builder.new(user, crypto).save(DateTime.current - 6.months)
node        = Node.last
node.ip     = '127.0.0.1'
node.wallet = 'PKe7MGTEXaunMhSXwT2D88QEk8JLXbYn7u'
node.save
operator = NodeManager::Operator.new(node)
puts "    - purchase..."
operator.purchase(DateTime.current - (6.months - 2.days))
puts "    - put online..."
operator.online(DateTime.current - (6.months - 2.days))

puts "  - Polis node..."
crypto = Crypto.find_by(name: 'Polis')
node = NodeManager::Builder.new(user, crypto).save(DateTime.current - 3.months)
node        = Node.last
node.ip     = '127.0.0.1'
node.wallet = 'PUqHkjJPD8hFwTz9M1WhYtG9pBx14GcLHn'
node.save
operator = NodeManager::Operator.new(node)
puts "    - purchase..."
operator.purchase(DateTime.current - (3.months - 2.days))
puts "    - put online..."
operator.online(DateTime.current - (3.months - 2.days))

puts "  - Polis node..."
crypto = Crypto.find_by(name: 'Polis')
node = NodeManager::Builder.new(user, crypto).save(DateTime.current - 2.months)
node        = Node.last
node.ip     = '127.0.0.1'
node.wallet = 'PWsH4BFYFQPX8Z3qRmVRg6KhjGzuTyEawe'
node.save
operator = NodeManager::Operator.new(node)
puts "    - purchase..."
operator.purchase(DateTime.current - (2.months - 2.days))
puts "    - put online..."
operator.online(DateTime.current - (2.months - 2.days))

puts "Gather rewards"
NodeScraper.run

puts "Get daily node price"
NodeDailyTicker.run

puts "DONE"
