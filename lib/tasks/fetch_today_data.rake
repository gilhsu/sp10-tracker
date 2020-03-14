desc "fetch today's data"
task fetch_today_data: :environment do
  puts "Attempting to fetch today's data from api..."

  Stock.last.check_stock_positions

  Stock.last.check_stock_weights

  Stock.last.fetch_data_master
end