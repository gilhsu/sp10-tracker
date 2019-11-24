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

  def backfill
    endpoint = "https://www.alphavantage.co/"
    output_size = "full"

    request_url = "#{endpoint}query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=#{self.name}&outputsize=#{output_size}&apikey=#{ENV["API_KEY1"]}"
    response_raw = HTTParty.get(request_url)

    # get an array of last 254 (one year + 1) dates
    date_array = response_raw["Time Series (Daily)"].keys[0,254]

    
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
        format_data[date_price_array[n].keys[0]] = {"change_price": change_price, "change_percent": change_percent}
        date_percent_array << format_data
        n = n + 1
      end
    end

    # create Record instance using the necessary data
    n = 0
    date_array_year = date_array[0,253]
    date_array_year.reverse.each do |date|
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
    get_year_records = Record.where(stock: stock)[0...253]

    one_year_dates = []
    # use one year records to insert first one year dates into array
    get_year_records.each do |record|
      one_year_dates << record.date
    end

    n = 0
    reverse_year_dates = one_year_dates.reverse
    reverse_year_dates.each do |date|
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

  def fetch_last_data
    format_data = {}
    record  = Record.where(stock: self).last
    format_data["date"] = record.date
    format_data["name"] = self.name
    if record.price
      format_data["price"] = record.price.round(2)
      format_data["change_price"] = record.change_price.round(2)
    end
    format_data["change_percent"] = record.change_percent.round(2)
    
    format_data
  end

  def fetch_year_data
    year_data = Record.where(stock: self).reverse[0...253]
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
      history_record["sp500_change_percent"] = sp500_record.change_percent.round(2)
      history_record["change_percent"] = record.change_percent.round(2)
      history_record["delta"] = (history_record["change_percent"] - history_record["sp500_change_percent"]).round(2)
      daily_history_array << history_record
    end
    daily_history_array.reverse
  end

end
