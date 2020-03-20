desc "Running backfill constituents task"
task backfill_constituents: :environment do
  puts "Backfilling constituents to daily records"

  sp10_records = Record.where(stock: Stock.find_by(name: "SP10")).order('date ASC')

  const_group1 = [
    {symbol: "MSFT", position: 1, weight: nil},
    {symbol: "AAPL", position: 2, weight: nil},
    {symbol: "AMZN", position: 3, weight: nil},
    {symbol: "FB", position: 4, weight: nil},
    {symbol: "BRK-B", position: 5, weight: nil},
    {symbol: "GOOG", position: 6, weight: nil},
    {symbol: "GOOGL", position: 7, weight: nil},
    {symbol: "JNJ", position: 8, weight: nil},
    {symbol: "JPM", position: 9, weight: nil},
    {symbol: "V", position: 10, weight: nil},
  ]

  const_group2 = [
    {symbol: "MSFT", position: 1, weight: nil},
    {symbol: "AAPL", position: 2, weight: nil},
    {symbol: "AMZN", position: 3, weight: nil},
    {symbol: "JNJ", position: 4, weight: nil},
    {symbol: "FB", position: 5, weight: nil},
    {symbol: "BRK-B", position: 6, weight: nil},
    {symbol: "GOOG", position: 7, weight: nil},
    {symbol: "GOOGL", position: 8, weight: nil},
    {symbol: "PG", position: 9, weight: nil},
    {symbol: "JPM", position: 10, weight: nil},
  ]

  sp10_records.each do |record|
    if record.date < Date.parse("March 17, 2020")
      record.update(constituents: const_group1)
    else
      record.update(constituents: const_group2)
    end
  end
end