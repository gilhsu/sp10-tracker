desc "fetch today's data"
task fetch_today_data: :environment do
  puts "Fetching today's from api"

  Stock.last.check_stock_weights

  Stock.last.fetch_data_master
end