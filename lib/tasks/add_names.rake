desc "add full names to existing stocks"
task add_names: :environment do
  puts "Adding names to existing stocks"

  sp500 = Stock.find_by(name: "SPX")
  stocks = Stock.where(in_fund: true)

  sp500.add_full_name

  Stock.last.timer(60)

  stocks[0...5].each do |stock|
    stock.add_full_name
  end
  
  Stock.last.timer(60)

  stocks[5...10].each do |stock|
    stock.add_full_name
  end
  
end