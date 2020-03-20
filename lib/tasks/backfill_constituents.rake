desc "Running backfill constituents task"
task backfill_constituents: :environment do
  puts "Backfilling constituents to daily records"

  sp10_records = Record.where(stock: Stock.find_by(name: "SP10")).order('date ASC')

  const_group1 = [
    {symbol: "Microsoft Corporation", position: 1, weight: nil}.to_json,
    {symbol: "Apple Inc.", position: 2, weight: nil}.to_json,
    {symbol: "Amazon.com Inc.", position: 3, weight: nil}.to_json,
    {symbol: "Facebook Inc.", position: 4, weight: nil}.to_json,
    {symbol: "Berkshire Hathaway Inc.", position: 5, weight: nil}.to_json,
    {symbol: "Alphabet Inc.", position: 6, weight: nil}.to_json,
    {symbol: "Alphabet Inc.", position: 7, weight: nil}.to_json,
    {symbol: "Johnson & Johnson", position: 8, weight: nil}.to_json,
    {symbol: "JPMorgan Chase & Co.", position: 9, weight: nil}.to_json,
    {symbol: "Visa Inc.", position: 10, weight: nil}.to_json,
  ]

  const_group2 = [
    {symbol: "Microsoft Corporation", position: 1, weight: nil}.to_json,
    {symbol: "Apple Inc.", position: 2, weight: nil}.to_json,
    {symbol: "Amazon.com Inc.", position: 3, weight: nil}.to_json,
    {symbol: "Johnson & Johnson", position: 4, weight: nil}.to_json,
    {symbol: "Facebook Inc.", position: 5, weight: nil}.to_json,
    {symbol: "Berkshire Hathaway Inc.", position: 6, weight: nil}.to_json,
    {symbol: "Alphabet Inc.", position: 7, weight: nil}.to_json,
    {symbol: "Alphabet Inc.", position: 8, weight: nil}.to_json,
    {symbol: "The Procter & Gamble Company", position: 9, weight: nil}.to_json,
    {symbol: "JPMorgan Chase & Co.", position: 10, weight: nil}.to_json,
  ]

  const_group3 = [
    {symbol: "Microsoft Corporation", position: 1, weight: 5.450191}.to_json,
    {symbol: "Apple Inc.", position: 2, weight: 5.118085}.to_json,
    {symbol: "Amazon.com Inc.", position: 3, weight: 3.922131}.to_json,
    {symbol: "Facebook Inc.", position: 4, weight: 1.844728}.to_json,
    {symbol: "Berkshire Hathaway Inc.", position: 5, weight: 1.710461}.to_json,
    {symbol: "Johnson & Johnson", position: 6, weight: 1.673907}.to_json,
    {symbol: "Alphabet Inc.", position: 7, weight: 1.668702}.to_json,
    {symbol: "Alphabet Inc.", position: 8, weight: 1.667435}.to_json,
    {symbol: "The Procter & Gamble Company", position: 9, weight: 1.383934}.to_json,
    {symbol: "JPMorgan Chase & Co.", position: 10, weight: 1.339904}.to_json,
  ]

  sp10_records.each do |record|
    if record.date < Date.parse("March 17, 2020")
      record.update(constituents: const_group1)
    elsif record.date < Date.parse("March 20, 2020")
      record.update(constituents: const_group2)
    elsif record.date < Date.parse("March 21, 2020")
      record.update(constituents: const_group3)
    end
  end
end