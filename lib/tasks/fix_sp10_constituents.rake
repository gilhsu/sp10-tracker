desc "Fixing stock record"
task fix_sp10_constituents: :environment do
  ARGV.each { |a| task a.to_sym do ; end }

  if ARGV[1]
    puts "Fixing SP10 constituents..."
    date = Date.parse(ARGV[1])

    constituents = Constituents.get(date, true)

    record = Record.where(stock: Stock.find_by(name: "SP10")).order('date DESC').first

    record.update(constituents: constituents)
    
    puts "SP10 constituents succesfully added to #{ARGV[1]} record."
  else
    puts "Problem fixing record. Please make sure syntax is correct. Rake syntax: 'rake fix_sp10_constituents 2020-3-25'"
  end
end