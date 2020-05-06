desc "update SPX stock name to VOO"
task update_spx_name: :environment do
  puts "Updating SPX stock name to VOO"

  sp500 = Stock.find_by(name: "FXAIX")

  if sp500
    sp500.update(name: "VOO", full_name: "Vanguard S&P 500 ETF")
    puts "Symbol SPX has been successfully updated to VOO"
  else
    puts "Sorry, stock FXAIX does not exist in database"
  end
end