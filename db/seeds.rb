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
  { name: 'Dash', symbol: 'dash', status: 'active', url: 'https://www.dash.org/', explorer_url: 'https://explorer.dash.org/address/', ticker_url: 'https://api.coinmarketcap.com/v2/ticker/131/' },
  { name: 'ZCoin', symbol: 'xzc', status: 'active', url: 'https://zcoin.io/', explorer_url: 'https://explorer.zcoin.io/address/', ticker_url: 'https://api.coinmarketcap.com/v2/ticker/1414/' },
  { name: 'Polis', symbol: 'polis', status: 'active', url: 'https://polispay.org/', explorer_url: 'https://explorer.polispay.org/address/', ticker_url: 'https://api.coinmarketcap.com/v2/ticker/2359/' },
  { name: 'PIVX', symbol: 'pivx', status: 'active', url: 'https://pivx.org/', explorer_url: 'http://www.presstab.pw/phpexplorer/PIVX/address.php?address=', ticker_url: 'https://api.coinmarketcap.com/v2/ticker/1169/' },
  { name: 'Stipend', symbol: 'spd', status: 'false', url: 'https://stipend.me/', explorer_url: 'http://explorer.stipend.me/address/', ticker_url: 'https://api.coinmarketcap.com/v2/ticker/2616/' }
])

puts "  - Scrape crypto data..."
CryptoScraper.run

puts "  - Price crypto..."
NodeManager::Pricer.run

user = User.last
puts "Create nodes for #{user.full_name}"
puts "  - Dash node..."
crypto = Crypto.find_by(name: 'Dash')
node = NodeManager::Builder.new(user, crypto).save(DateTime.current - 6.months)
node.wallet = 'XdL3KXxRfzUmGj9QMA7i1W3M3fZdcjNnfw'
node.save
operator = NodeManager::Operator.new(node)
puts "    - purchase..."
operator.purchase(DateTime.current - 6.months)

puts "  - ZCoin node..."
crypto = Crypto.find_by(name: 'ZCoin')
node = NodeManager::Builder.new(user, crypto).save(DateTime.current - 1.month)
node.ip     = '127.0.0.1'
node.wallet = 'aLeviMejPb6mJqYbAX5ULibCZN9JwiViMb'
node.save
operator = NodeManager::Operator.new(node)
puts "    - purchase..."
operator.purchase(DateTime.current - (1.month - 1.day))
puts "    - put online..."
operator.online(DateTime.current - (1.month - 1.day))

puts "  - PIVX node..."
crypto = Crypto.find_by(name: 'PIVX')
node = NodeManager::Builder.new(user, crypto).save(DateTime.current - 1.month)
node.ip     = '127.0.0.1'
node.wallet = 'DBp1yapipgMNoh9mT6sMdYTn9m4ZJW4hP3'
node.save
operator = NodeManager::Operator.new(node)
puts "    - purchase..."
operator.purchase(DateTime.current - (1.month - 2.days))
puts "    - put online..."
operator.online(DateTime.current - (1.month - 2.days))

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
node = NodeManager::Builder.new(user, crypto).save(DateTime.current - 4.months)
node        = Node.last
node.ip     = '127.0.0.1'
node.wallet = 'PUqHkjJPD8hFwTz9M1WhYtG9pBx14GcLHn'
node.save
operator = NodeManager::Operator.new(node)
puts "    - purchase..."
operator.purchase(DateTime.current - (4.months - 2.days))
puts "    - put online..."
operator.online(DateTime.current - (4.months - 2.days))

puts "Gather rewards"
NodeScraper.run

puts "Get daily node price"
NodeDailyTicker.run

puts "DONE"
