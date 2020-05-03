desc "update SPX stock name to FXAIX"
task update_spx_name: :environment do
  puts "Updating SPX stock name to FXAIX"

  sp500 = Stock.find_by(name: "SPX")

  if sp500
    sp500.update(name: "FXAIX", full_name: "Fidelity 500 Index Fund")
    puts "Symbol SPX has been successfully updated to FXAIX"
  else
    puts "Sorry, stock SPX does not exist in database"
  end
end