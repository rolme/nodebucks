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
puts "    - adding rewards..."
node = Node.last
node.wallet = 'ZXCVBNMASDFGHJJQWERT'
node.online_at = DateTime.current - 23.days
node.status = 'online'
node.save
node.rewards.create([
  { timestamp: DateTime.current - 20.days, amount: 14.04, txhash: '05f53a826051556393aa9e3e00c254835abd60bde577a49d4ba01747e5758fea' },
  { timestamp: DateTime.current - 18.days, amount: 14.04, txhash: '15f53a826051556393aa9e3e00c254835abd60bde577a49d4ba01747e5758fe0' },
  { timestamp: DateTime.current - 16.days, amount: 14.04, txhash: '25f53a826051556393aa9e3e00c254835abd60bde577a49d4ba01747e5758fe1' },
  { timestamp: DateTime.current - 14.days, amount: 14.04, txhash: '35f53a826051556393aa9e3e00c254835abd60bde577a49d4ba01747e5758fe2' },
  { timestamp: DateTime.current - 12.days, amount: 14.04, txhash: '45f53a826051556393aa9e3e00c254835abd60bde577a49d4ba01747e5758fe3' },
  { timestamp: DateTime.current - 10.days, amount: 14.04, txhash: '55f53a826051556393aa9e3e00c254835abd60bde577a49d4ba01747e5758fe4' },
  { timestamp: DateTime.current - 8.days, amount: 14.04, txhash: '65f53a826051556393aa9e3e00c254835abd60bde577a49d4ba01747e5758fe5' },
  { timestamp: DateTime.current - 6.days, amount: 14.04, txhash: '75f53a826051556393aa9e3e00c254835abd60bde577a49d4ba01747e5758fe6' },
  { timestamp: DateTime.current - 4.days, amount: 14.04, txhash: '85f53a826051556393aa9e3e00c254835abd60bde577a49d4ba01747e5758fe7' },
  { timestamp: DateTime.current - 2.days, amount: 14.04, txhash: '95f53a826051556393aa9e3e00c254835abd60bde577a49d4ba01747e5758fe8' },
  { timestamp: DateTime.current, amount: 14.04, txhash: 'a5f53a826051556393aa9e3e00c254835abd60bde577a49d4ba01747e5758fe9' }
])
