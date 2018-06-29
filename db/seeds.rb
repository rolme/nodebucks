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
  { name: 'Dash', symbol: 'dash', status: 'active', url: 'https://www.dash.org/', explorer_url: 'https://explorer.dash.org/address/' },
  { name: 'ZCoin', symbol: 'xzc', status: 'active', url: 'https://zcoin.io/', explorer_url: 'https://explorer.zcoin.io/address/' },
  { name: 'Polis', symbol: 'polis', status: 'active', url: 'https://polispay.org/', explorer_url: 'https://explorer.polispay.org/address/' },
  { name: 'PIVX', symbol: 'pivx', status: 'active', url: 'https://pivx.org/', explorer_url: 'http://www.presstab.pw/phpexplorer/PIVX/address.php?address=' },
  { name: 'Stipend', symbol: 'spd', status: 'false', url: 'https://stipend.me/', explorer_url: 'http://explorer.stipend.me/address/' }
])

puts "  - Scrape crypto data..."
CryptoScraper.run

puts "  - Price crypto..."
NodeManager::Pricer.run

user = User.last
puts "Create nodes for #{user.full_name}"
puts "  - Dash node..."
node = NodeManager::Builder.new(user, Crypto.first, Crypto.first.node_price).save
node.wallet = 'XdL3KXxRfzUmGj9QMA7i1W3M3fZdcjNnfw'
node.save
puts "  - Polis node..."
node = NodeManager::Builder.new(user, Crypto.third, Crypto.third.node_price).save(DateTime.current - 3.months)
node        = Node.last
node.ip     = '127.0.0.1'
node.wallet = 'PUqHkjJPD8hFwTz9M1WhYtG9pBx14GcLHn'
node.save
operator = NodeManager::Operator.new(node)
puts "    - put online..."
operator.online(DateTime.current - (3.months - 2.days))

puts "Gather rewards..."
NodeScraper.run

puts "DONE"
