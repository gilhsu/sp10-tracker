desc "backfill stock data"
task backfill_stock_data: :environment do
  puts "Backfilling stock data from api"

  ARGV.each { |a| task a.to_sym do ; end }

  Stock.last.fetch_data_master(ARGV[1].to_i)
end