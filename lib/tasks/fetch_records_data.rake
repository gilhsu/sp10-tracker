desc "fetch records data"
task fetch_records_data: :environment do
  puts "Attempting to fetch records data from api..."

  today = Time.now.in_time_zone('Eastern Time (US & Canada)').to_date.strftime('%a')

  if today == "Sat" || today == "Sun"
    puts "It's the weekend! Not fetching data today."
  else
    Constituents.check_stock_positions
    Stock.last.fetch_data_master
  end
end