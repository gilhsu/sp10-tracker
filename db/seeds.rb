# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

seed_stocks = [
  {name: "SP10", in_fund: false},
  {name: "SPX", in_fund: false}, 
]

seed_stocks.each do |stock|
  if !Stock.find_by(name: stock[:name])
    puts "creating #{stock[:name]} instance"
    Stock.create(name: stock[:name], in_fund: stock[:in_fund])
  end
end

Stock.find_by(name: "SPX").add_full_name

Stock.last.check_stock_positions