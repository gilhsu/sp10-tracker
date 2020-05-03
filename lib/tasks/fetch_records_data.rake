desc "fetch records data"
task fetch_records_data: :environment do
  puts "Attempting to fetch records data from api..."
  ARGV.each { |a| task a.to_sym do ; end }

  override = ARGV[1] === "override"

  today = Time.now.in_time_zone('Eastern Time (US & Canada)').to_date.strftime('%a')

  if today == "Sat" || today == "Sun" && !override
    puts "It's the weekend! Not fetching data today. If this is intentional, add the 'override' keyword to the rake task. 'rake fetch_records_data override'"
  else
    Constituents.check_stock_positions
    Stock.last.fetch_data_master
  end
end