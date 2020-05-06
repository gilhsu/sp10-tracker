desc "Fixing stock record"
task fix_stock_record: :environment do
  ARGV.each { |a| task a.to_sym do ; end }
  
  if ARGV[1] && ARGV[2]
    stock_name = ARGV[1]
    date = ARGV[2]
    
    stock = Stock.find_by(name: stock_name)
    record = Record.find_by(date: date, stock: stock)
    if stock && record
      puts "Fixing #{date} record for #{stock_name}"
      stock.fix_record(record)
    else
      puts "Problem fixing record. Either Stock or Record with date provided does not exist on the database."
    end
  else
    puts "Problem fixing record. Please make sure syntax is correct. Rake syntax: 'rake fix_stock_record VOO 2020-3-25'"
  end
end