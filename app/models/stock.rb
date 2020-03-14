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

  def fetch_data(days = nil)
    endpoint = "https://www.alphavantage.co/"
    output_size = "full"

    request_url = "#{endpoint}query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=#{self.name}&outputsize=#{output_size}&apikey=#{ENV["API_KEY1"]}"
    response_raw = HTTParty.get(request_url)
    response = response_raw["Time Series (Daily)"]

    while !response
      puts "Problem fetching data from api..."
      Stock.last.timer(70)
      response_raw = HTTParty.get(request_url)
      response = response_raw["Time Series (Daily)"]
    end

    # used to collect the number of records to parse
    number_of_records = days ? days : (Date.today - Record.where(stock: Stock.last).last.date).to_i

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

  def fetch_data_sp10
    sp10 = Stock.find_by(name: "SP10")
    sp10_records = Record.where(stock: sp10)
    sp10_records_dates = []
    sp10_records.each do |record|
      sp10_records_dates << record.date
    end

    stock = Stock.second
    stock_records = Record.where(stock: stock).order('date ASC')
    stock_records_dates = []
    stock_records.each do |record|
      stock_records_dates << record.date
    end

    # creates array of dates that exist in Stocks but does not exist yet on SP10
    dates_array = []
    stock_records_dates.each do |date|
      if !sp10_records_dates.include? date
        dates_array << date
      end
    end

    dates_array.each do |date|
      fund_stocks = Stock.where(in_fund: true)

      # make an array of SP10 records from this specific day
      records_by_date_array = []
      fund_stocks.each do |stock|
        records_by_date_array << Record.find_by(date: date, stock: stock)
      end
      
      # add up the change_percent from this specifc day
      change_percent_sum = 0
      records_by_date_array.each do |record|
        change_percent_sum = change_percent_sum + record.change_percent
      end
      
      # get average of change_percent
      change_percent_average = change_percent_sum / records_by_date_array.length
      
      # create SP10 record
      Record.create(stock: sp10, date: date, change_percent: change_percent_average)
      puts "SP10 record for #{date} created"
    end

    puts "Data merge for SP10 complete."
  end

  def fetch_data_master(days = nil)
    # if Record.last exists, check number of records needed to fetch. if no records default to 1 so it fetches
    number_of_records = Record.last ? (Date.today - Record.where(stock: Stock.find_by(name: "SP10")).last.date).to_i : 1

    if number_of_records > 0
      sp500 = Stock.find_by(name: "SPX")
      stocks = Stock.where(in_fund: true)

      sp500.fetch_data(days)

      stocks.each do |stock|
        stock.fetch_data(days)
      end

      Stock.last.fetch_data_sp10

      puts "Data update is complete."
    else
      puts "Stock data is up to date! No fetch executed."
    end
  end


  # front-end data fetches
  def fetch_last_data
    format_data = {}
    record  = Record.where(stock: self).last
    format_data["date"] = record.date
    format_data["full_name"] = self.full_name
    format_data["weight"] = self.weight ? self.weight : nil
    if record.price
      format_data["price"] = record.price.round(2)
      format_data["change_price"] = record.change_price.round(2)
    end
    format_data["change_percent"] = record.change_percent.round(2)
    
    format_data
  end

  def fetch_year_data
    year_data = Record.where(stock: self).order("date ASC").reverse[0...252]
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

      full_name = response_raw["bestMatches"] ? response_raw["bestMatches"][0]["2. name"] : nil

      while !full_name
        puts "Problem fetching name from api..."
        Stock.last.timer(70)
        response_raw = HTTParty.get(request_url)
        full_name = response_raw["bestMatches"][0]["2. name"]
      end
    
      self.update(full_name: full_name)
      puts "#{full_name} added to record!"
    else
      puts "Full name already exists"
    end
  end

  def check_stock_positions
    url = "https://www.slickcharts.com/sp500"
    unparsed_page = HTTParty.get(url)
    parsed_page = Nokogiri::HTML(unparsed_page)
    stocks_raw_data = parsed_page.css('tr')[1, 10]
    current_stocks = Stock.all
    
    # temporarily set all stocks in sp10 to false
    current_stocks.each do |stock|
      stock.update(in_fund: false)
    end

    total_10_weight = 0
    stocks_raw_data.each do |stock|
      symbol = stock.css('td')[2].children.children[0].text.gsub('.', '-')
      position = stock.css('td')[0].children.text.to_i
      weight = stock.css('td')[3].children.text.to_f
      total_10_weight = total_10_weight + weight
      if Stock.find_by(name: symbol)
        Stock.find_by(name: symbol).update(in_fund: true, position: position, weight: weight)
      else
        new_stock = Stock.create(name: symbol, in_fund: true, position: position, weight: weight)
        new_stock.add_full_name
      end
    end
    Stock.find_by(name: "SP10").update(weight: total_10_weight)
  end
end
