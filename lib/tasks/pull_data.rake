desc "pull 365 day data"
task pull_data: :environment do
  puts "Pulling data from api"

  stocks_array = Stock.where(in_fund: true)

  stocks_array.each do |stock|
    puts stock.name
  end

  # response_raw = HTTParty.get("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=AAPL&apikey=2NSG0O0E1I8ESDEZ")

  # puts response_raw["Meta Data"]["2. Symbol"]
  puts "#{Time.now} — Success!"
end