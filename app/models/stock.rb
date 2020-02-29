class Stock < ApplicationRecord
  validates :name, presence: true

  def timer(time)
    n = time
    rep = time
    rep.times do 
      puts "#{n} seconds left"
      n = n - 1
      sleep 1
    end
  end

  def fetch_data(full_data = false)
    endpoint = "https://www.alphavantage.co/"
    output_size = "full"

    request_url = "#{endpoint}query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=#{self.name}&outputsize=#{output_size}&apikey=#{ENV["API_KEY1"]}"
    response_raw = HTTParty.get(request_url)
    response = response_raw["Time Series (Daily)"]

    # used to collect either full year or 1 day of records
    number_of_records = full_data ? 253 : 1

    # create array of hashes with daily data
    format_data_array = []
    n = 0
    number_of_records.times do
      format_data = {}
      format_data["name"] = self.name
      
      first_date_string = response.keys[n]
      second_date_string = response.keys[n+1]
      first_date = Date.parse(first_date_string)
      format_data["date"] = first_date

      first_price = (response[first_date_string]["5. adjusted close"]).to_f
      format_data["price"] = first_price
      
      second_price = (response[second_date_string]["5. adjusted close"]).to_f
      change_price = first_price - second_price
      format_data["change_price"] = change_price

      change_percent = ((first_price / second_price) - 1) * 100
      format_data["change_percent"] = change_percent

      format_data_array << format_data
      n += 1
    end

    # reverse data array to create Record instances in cronological order
    format_data_array.reverse.each do |record|
      date = record["date"]
      if Record.where(stock: self, date: date).length === 0
        price = record["price"]
        change_price = record["change_price"]
        change_percent = record["change_percent"]
        Record.create(date: date, price: price, change_price: change_price, change_percent: change_percent, stock: self)
        puts "#{self.name} record for #{date} created"
      else
        puts "#{self.name} record for #{date} already exists."
      end
    end

    puts "Data fetch for #{self.name} complete."
  end

  def fetch_data_sp10(full_data = false)
    sp10 = Stock.find_by(name: "SP10")
    stock = Stock.second
    get_records = full_data ? Record.where(stock: stock) : [Record.where(stock: stock).last]

    dates_array = []
    # use records to insert dates into an array
    get_records.reverse.each do |record|
      dates_array << record.date
    end

    dates_array.each do |date|
      fund_stocks = Stock.where(in_fund: true)

      # make an array of SP10 records from this specific day
      records_by_date_array = []
      fund_stocks.each do |stock|
        records_by_date_array << Record.where(date: date, stock: stock)[0]
      end
      
      # add up the change_percent from this specifc day
      change_percent_sum = 0
      records_by_date_array.each do |record|
        change_percent_sum = change_percent_sum + record.change_percent
      end
      
      # get average of change_percent
      change_percent_average = change_percent_sum / records_by_date_array.length

      # create SP10 record if today's record doesn't exist yet
      if Record.where(date: date, stock: sp10).length === 0
        Record.create(stock: sp10, date: date, change_percent: change_percent_average)
        puts "SP10 record for #{date} created"
      else
        puts "SP10 record for #{date} already exists"
      end
    end

    puts "Data merge for SP10 complete."
  end

  def fetch_data_master(full_data = false)
    sp500 = Stock.find_by(name: "SPX")
    stocks = Stock.where(in_fund: true)
    stocks_first_five = stocks[0...5]
    stocks_last_five = stocks[5...10]

    sp500.fetch_data(full_data)

    Stock.last.timer(60)

    stocks_first_five.each do |stock|
      stock.fetch_data(full_data)
    end

    Stock.last.timer(60)

    stocks_last_five.each do |stock|
      stock.fetch_data(full_data)
    end

    Stock.last.fetch_data_sp10(full_data)

    request_label = full_data ? "1 year's worth of" : "today's"

    puts "Fetch for #{request_label} data is complete."
  end


  # front-end data fetches
  def fetch_last_data
    format_data = {}
    record  = Record.where(stock: self).last
    format_data["date"] = record.date
    format_data["name"] = self.name
    format_data["full_name"] = self.full_name
    if record.price
      format_data["price"] = record.price.round(2)
      format_data["change_price"] = record.change_price.round(2)
    end
    format_data["change_percent"] = record.change_percent.round(2)
    
    format_data
  end

  def fetch_year_data
    year_data = Record.where(stock: self).reverse[0...252]
    year_data_reverse = year_data.reverse
    change_percent_total = 1
    year_data_reverse.each do |record|
      change_percent_total = change_percent_total * (1 + (record.change_percent / 100))
    end

    year_data = {}
    year_data["change_percent"] = ((change_percent_total - 1) * 100).round(2)

    year_data
  end

  def fetch_daily_history
    daily_history_array = []
    year_data = Record.where(stock: self)
    sp500 = Stock.find_by(name: "SPX")
    year_data.each do |record|
      history_record = {}
      sp500_record = Record.where(stock: sp500, date: record.date)[0]
      history_record["name"] = record.stock.name
      history_record["date"] = record.date.strftime("%a, %b %e, %Y")
      history_record["date_raw"] = record.date
      history_record["sp500_change_percent"] = sp500_record.change_percent.round(2)
      history_record["change_percent"] = record.change_percent.round(2)
      history_record["delta"] = (history_record["change_percent"] - history_record["sp500_change_percent"]).round(2)
      daily_history_array << history_record
    end
    daily_history_array.reverse
  end


  def add_full_name
    if self.full_name === nil 
      endpoint = "https://www.alphavantage.co/"
  
      request_url = "#{endpoint}query?function=SYMBOL_SEARCH&keywords=#{self.name}&apikey=#{ENV["API_KEY1"]}"
      response_raw = HTTParty.get(request_url)
      full_name = response_raw["bestMatches"][0]["2. name"]
    
      self.update(full_name: full_name)
      puts "#{full_name} added to record!"
    else
      puts "Full name already exists"
    end
  end

end
