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

sp500 = Stock.find_by(name: "SPX")
stocks = Stock.where(in_fund: true)
stocks_first_five = stocks[0...5]
stocks_last_five = stocks[5...10]


sp500.fetch_data(true)

Stock.last.timer(60)

stocks_first_five.each do |stock|
  stock.fetch_data(true)
end

Stock.last.timer(60)

stocks_last_five.each do |stock|
  stock.fetch_data(true)
end

Stock.last.fetch_data_sp10(true)

puts "Done!"
