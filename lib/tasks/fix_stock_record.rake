desc "Fixing stock record"
task fix_stock_record: :environment do
  ARGV.each { |a| task a.to_sym do ; end }
  
  if ARGV[1] && ARGV[2]
    stock_name = ARGV[1]
    date = ARGV[2]
    puts "Fixing #{date} record for #{stock_name}"

    stock = Stock.find_by(name: stock_name)
    record = Record.find_by(date: date, stock: stock)
    if stock && record
      stock.fix_record(record)
    end
  else
    puts "Fixing stock record requires stock name and date arguments. Rake format: 'rake fix_stock_record SPX 2020-3-25'"
  end
end