desc "fetch today's data"
task fetch_today_data: :environment do
  puts "Fetching today's from api"

  sp500 = Stock.find_by(name: "SPX")
  stocks_array = Stock.where(in_fund: true)
  stocks_first_five = stocks_array[0,5]
  stocks_last_five = stocks_array[5,10]

  sp500.fetch_data
  
  Stock.last.timer(60)
  
  stocks_first_five.each do |stock|
    stock.fetch_data
  end
    
  Stock.last.timer(60)
  
  stocks_last_five.each do |stock|
    stock.fetch_data
  end
  
  sp10 = Stock.find_by(name: "SP10")
  sp10.fetch_data_sp10

  puts "Data fetch successful!"
end