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
NodeManager::Builder.new(user, Crypto.third, Crypto.third.node_price).save(DateTime.current - 25.days)
node        = Node.last
node.ip     = '127.0.0.1'
node.wallet = 'ZXCVBNMASDFGHJJQWERT'
node.save
operator = NodeManager::Operator.new(node)
puts "    - put online..."
operator.online(DateTime.current - 23.days)
puts "    - adding rewards..."
operator.reward(DateTime.current - 20.days, 14.04, '05f53a826051556393aa9e3e00c254835abd60bde577a49d4ba01747e5758fea')
operator.reward(DateTime.current - 18.days, 14.04, '15f53a826051556393aa9e3e00c254835abd60bde577a49d4ba01747e5758fe0')
operator.reward(DateTime.current - 16.days, 14.04, '25f53a826051556393aa9e3e00c254835abd60bde577a49d4ba01747e5758fe1')
operator.reward(DateTime.current - 14.days, 14.04, '35f53a826051556393aa9e3e00c254835abd60bde577a49d4ba01747e5758fe2')
operator.reward(DateTime.current - 12.days, 14.04, '45f53a826051556393aa9e3e00c254835abd60bde577a49d4ba01747e5758fe3')
operator.reward(DateTime.current - 10.days, 14.04, '55f53a826051556393aa9e3e00c254835abd60bde577a49d4ba01747e5758fe4')
operator.reward(DateTime.current - 8.days, 14.04, '65f53a826051556393aa9e3e00c254835abd60bde577a49d4ba01747e5758fe5')
operator.reward(DateTime.current - 6.days, 14.04, '75f53a826051556393aa9e3e00c254835abd60bde577a49d4ba01747e5758fe6')
operator.reward(DateTime.current - 4.days, 14.04, '85f53a826051556393aa9e3e00c254835abd60bde577a49d4ba01747e5758fe7')
operator.reward(DateTime.current - 2.days, 14.04, '95f53a826051556393aa9e3e00c254835abd60bde577a49d4ba01747e5758fe8')
operator.reward(DateTime.current, 14.04, 'a5f53a826051556393aa9e3e00c254835abd60bde577a49d4ba01747e5758fe9')
