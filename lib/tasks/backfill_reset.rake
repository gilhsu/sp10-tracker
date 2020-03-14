desc "Running backfill task"
task backfill_reset: :environment do
  ARGV.each { |a| task a.to_sym do ; end }
  
  if ARGV[1].to_i != 0 
    puts "Backfilling stock data from api"
    Stock.last.fetch_data_master(ARGV[1].to_i)
  else
    puts "Number of days to fetch argument required and must be an integer. Rake format: 'rake nuclear_reset 100'"
  end
end