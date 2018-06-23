puts "Add users"
User.create([
  { admin: true, first: 'Ron', last: 'Parnaso', email: 'ron.parnaso@gmail.com', password: 'test', password_confirmation: 'test' },
  { admin: true, first: 'Jay', last: 'Severson', email: 'jay.severson@gmail.com', password: 'test', password_confirmation: 'test' },
  { first: 'Rick', last: 'Jackman', email: 'jackmanrick@gmail.com', password: 'test', password_confirmation: 'test' },
  { admin: true, first: 'Kostya', last: 'Harutyunyan', email: 'harutyunyankostya@yahoo.com', password: 'test', password_confirmation: 'test' }
])

puts "Add cryptos"
Crypto.create([
  { name: 'Dash', symbol: 'dash', status: 'active', url: 'https://www.dash.org/' },
  { name: 'ZCoin', symbol: 'xzc', status: 'active', url: 'https://zcoin.io/' },
  { name: 'Polis', symbol: 'polis', status: 'active', url: 'https://polispay.org/' },
  { name: 'PIVX', symbol: 'pivx', status: 'active', url: 'https://stipend.me/' }
])

puts "  - Scrape crypto data..."
CryptoScraper.run

puts "  - Price crypto..."
NodeManager::Pricer.run

user = User.third
puts "Create nodes for #{user.full_name}"
puts "  - Dash node..."
NodeManager::Builder.new(user, Crypto.first, Crypto.first.node_price).save
puts "  - Polis node..."
NodeManager::Builder.new(user, Crypto.third, Crypto.third.node_price).save
