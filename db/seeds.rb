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
  {name: "MSFT", in_fund: true},
  {name: "AAPL", in_fund: true}, 
  {name: "AMZN", in_fund: true}, 
  {name: "FB", in_fund: true}, 
  {name: "BRK-B", in_fund: true}, 
  {name: "GOOG", in_fund: true}, 
  {name: "GOOGL", in_fund: true}, 
  {name: "JPM", in_fund: true}, 
  {name: "JNJ", in_fund: true}, 
  {name: "V", in_fund: true}
]

seed_stocks.each do |stock|
  if !Stock.find_by(name: stock[:name])
    puts "creating #{stock[:name]} instance"
    Stock.create(name: stock[:name], in_fund: stock[:in_fund])
  end
end

puts "Attaching full stock names to stocks"
Rake::Task["add_names"].invoke


