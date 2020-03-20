desc "Running backfill constituents task"
task backfill_constituents: :environment do
  puts "Backfilling constituents to daily records"

  sp10_records = Record.where(stock: Stock.find_by(name: "SP10")).order('date ASC')

  const_group1 = [
    {symbol: "MSFT", position: 1, weight: nil}.to_json,
    {symbol: "AAPL", position: 2, weight: nil}.to_json,
    {symbol: "AMZN", position: 3, weight: nil}.to_json,
    {symbol: "FB", position: 4, weight: nil}.to_json,
    {symbol: "BRK-B", position: 5, weight: nil}.to_json,
    {symbol: "GOOG", position: 6, weight: nil}.to_json,
    {symbol: "GOOGL", position: 7, weight: nil}.to_json,
    {symbol: "JNJ", position: 8, weight: nil}.to_json,
    {symbol: "JPM", position: 9, weight: nil}.to_json,
    {symbol: "V", position: 10, weight: nil}.to_json,
  ]

  const_group2 = [
    {symbol: "MSFT", position: 1, weight: nil}.to_json,
    {symbol: "AAPL", position: 2, weight: nil}.to_json,
    {symbol: "AMZN", position: 3, weight: nil}.to_json,
    {symbol: "JNJ", position: 4, weight: nil}.to_json,
    {symbol: "FB", position: 5, weight: nil}.to_json,
    {symbol: "BRK-B", position: 6, weight: nil}.to_json,
    {symbol: "GOOG", position: 7, weight: nil}.to_json,
    {symbol: "GOOGL", position: 8, weight: nil}.to_json,
    {symbol: "PG", position: 9, weight: nil}.to_json,
    {symbol: "JPM", position: 10, weight: nil}.to_json,
  ]

  sp10_records.each do |record|
    if record.date < Date.parse("March 17, 2020")
      record.update(constituents: const_group1)
    else
      record.update(constituents: const_group2)
    end
  end
end