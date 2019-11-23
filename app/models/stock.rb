class Stock < ApplicationRecord
  validates :name, presence: true

  def poop
    puts "poop"
  end

  def timer(time)
    n = time
    rep = time
    rep.times do 
      puts "#{n} seconds left"
      n = n - 1
      sleep 1
    end
  end

  def fetch_data(full_year = false)
    key1 = "2NSG0O0E1I8ESDEZ"
    key2 = "GPVI77SN18N0LB1J"
    key3 = "7FTS2A6T4HRYU6MC"

    endpoint = "https://www.alphavantage.co/"
    output_size = "compact"

    request_url = "#{endpoint}query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=#{self.name}&outputsize=#{output_size}&apikey=#{key1}"
    response_raw = HTTParty.get(request_url)

    format_data = {}
    format_data["date"] = Date.parse(response_raw["Meta Data"]["3. Last Refreshed"])
    format_data["symbol"] = response_raw["Meta Data"]["2. Symbol"]

    today_close = response_raw["Time Series (Daily)"].values[0]["4. close"].to_f
    prev_close = response_raw["Time Series (Daily)"].values[1]["4. close"].to_f
    change_price = today_close - prev_close
  
    format_data["price"] = sprintf('%.2f', today_close)
    format_data["change_price"] = sprintf('%.2f', today_close - prev_close)

    change_percent = (change_price / prev_close) * 100

    format_data["change_percent"] = sprintf('%.2f', change_percent)

    format_data
  end

  def backfill
    key1 = "2NSG0O0E1I8ESDEZ"
    key2 = "GPVI77SN18N0LB1J"
    key3 = "7FTS2A6T4HRYU6MC"

    endpoint = "https://www.alphavantage.co/"
    output_size = "full"

    request_url = "#{endpoint}query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=#{self.name}&outputsize=#{output_size}&apikey=#{key1}"
    response_raw = HTTParty.get(request_url)

    # get an array of last 366 dates
    date_array = response_raw["Time Series (Daily)"].keys[0,366]
    
    # use date_array for the keys to dig into the response raw data => 
    # returns a date_price_array
    date_price_array = []
    date_array.each do |date|
      format_data = {}
      format_data[date] = response_raw["Time Series (Daily)"][date]["5. adjusted close"]
      date_price_array << format_data
    end
    
    # use date_price_array to determine the percentage difference each day =>
    # returns date_percent_array
    date_percent_array = []
    n = 0
    date_price_array.each do |date_price|
      if n < date_price_array.length - 1
        format_data = {}
        today_close = (date_price_array[n].values[0]).to_f
        prev_close = (date_price_array[n+1].values[0]).to_f
        change_price = today_close - prev_close
        change_percent = (change_price / prev_close) * 100
        binding.pry
        format_data[date_price_array[n].keys[0]] = {"change_price": change_price, "change_percent": change_percent}
        date_percent_array << format_data
        n = n + 1
      end
    end

    # create Record instance using the necessary data
    n = 0
    date_array_365 = date_array[0,365]
    date_array_365.reverse.each do |date|
      if n < date_price_array.length - 1
        name = response_raw["Meta Data"]["2. Symbol"]
        stock = Stock.find_by(name: name)
        record_date = Date.parse(date)
        price = (response_raw["Time Series (Daily)"][date]["5. adjusted close"]).to_f
        
        change_price = 0
        change_percent = 0
        date_percent_array.each do |date_percent|
          if date_percent[date]
            change_price = date_percent[date][:change_price]
            change_percent = date_percent[date][:change_percent]
          end
        end
        if Record.where(date: date, stock: stock).length === 0
          Record.create(date: date, price: price, change_price: change_price, change_percent: change_percent, stock: stock)
        end
        n = n + 1
      end
    end

    puts "Successfully created #{n} records of #{response_raw["Meta Data"]["2. Symbol"]}"
  end

  def backfill_sp10
    sp10 = Stock.find_by(name: "SP10")
    stock = Stock.second
    get_365_records = Record.where(stock: stock)[0...365]

    first_365_dates = []
    # use 365 records to insert first 365 dates into array
    get_365_records.each do |record|
      first_365_dates << record.date
    end

    n = 0
    reverse_365_dates = first_365_dates.reverse
    reverse_365_dates.each do |date|
      fund_stocks = Stock.where(in_fund: true)
      records_by_date_array = []
      fund_stocks.each do |stock|
        records_by_date_array << Record.where(date: date, stock: stock)[0]
      end
      
      change_percent_sum = 0
      records_by_date_array.each do |record|
        change_percent_sum = change_percent_sum + record.change_percent
      end
      change_percent_average = change_percent_sum / records_by_date_array.length
      Record.create(stock: sp10, date: date, change_percent: change_percent_average)
      n = n + 1
    end
    puts "Successfully created #{n} records of #{sp10.name}"
  end

  def fetch_data
    format_data = {}
    record  = Record.where(stock: self).last
    format_data["date"] = record.date
    format_data["name"] = self.name
    if record.price
      format_data["price"] = sprintf('%.2f', record.price)
      format_data["change_price"] = sprintf('%.2f', record.change_price)
    end
    format_data["change_percent"] = sprintf('%.2f', record.change_percent)
    
    format_data
  end

  def fetch_365_data
    data_365 = Record.where(stock: self).reverse[0...365]
    data_365_reverse = data_365.reverse
    change_percent_total = 1
    change_percent_array = []
    data_365_reverse.each do |record|
      change_percent_total = change_percent_total * (1 + (record.change_percent / 100))
      change_percent_array << 1 + (record.change_percent / 100)
    end

    data_365 = {}
    data_365["change_percent"] = sprintf('%.2f', (change_percent_total - 1) * 100)

    data_365
  end

end
