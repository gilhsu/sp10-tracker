desc "backfill stock data"
task backfill_stock_data: :environment do
  puts "Backfilling stock data from api"

  ARGV.each { |a| task a.to_sym do ; end }

  if ARGV[1].to_i != 0 || ARGV[1].to_i == nil
    Stock.last.fetch_data_master(ARGV[1].to_i)
  else
    puts "Number of days argument required and must be an integer. Rake format: 'rake backfill_stock_data 100'"
  end
end