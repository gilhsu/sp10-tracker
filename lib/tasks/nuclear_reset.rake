desc "Nuclear website reset"
task nuclear_reset: :environment do
  ARGV.each { |a| task a.to_sym do ; end }
  
  if ARGV[1].to_i != 0 
    ["drop", "create", "migrate", "seed"].each do |rake|
      puts "db:#{rake}"
      Rake::Task["db:#{rake}"].invoke
    end
    puts "Attaching full stock names to stocks"
    Rake::Task["add_names"].invoke
    puts "Backfilling stock data from api"
    Stock.last.fetch_data_master(ARGV[1].to_i)
  else
    puts "Number of days to fetch argument required and must be an integer. Rake format: 'rake nuclear_reset 100'"
  end
end