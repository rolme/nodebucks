# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Crypto.create([
  { name: 'Dash', symbol: 'dash', status: 'active' },
  { name: 'ZCoin', symbol: 'xzc', status: 'active' },
  { name: 'Stipend', symbol: 'spd', status: 'active' },
  { name: 'Polis', symbol: 'polis', status: 'active' },
  { name: 'PIVX', symbol: 'pivx', status: 'active' }
])
