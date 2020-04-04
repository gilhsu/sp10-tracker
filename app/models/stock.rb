class Stock < ApplicationRecord
  validates :name, presence: true

  def fetch_data
    response = AlphaVantage.daily_fetch(self)

    # determines how many records to parse
    last_sp10_record_date = Record.where(stock: Stock.find_by(name: "SP10")).last.date
    number_of_records = Helper.business_days_between(last_sp10_record_date, Date.today)

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
        Record.create(
          stock: self, 
          date: date, 
          price: price, 
          change_price: change_price, 
          change_percent: change_percent, 
        )
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

      # get sp10 constituents
      constituents = Constituents.get(date)
      
      # create SP10 record
      Record.create(stock: sp10, date: date, change_percent: change_percent_average, constituents: constituents)
      puts "SP10 record for #{date} created"
    end

    puts "Data merge for SP10 complete."
  end

  def fetch_data_master
    # determine now many business days to fetch
    last_sp10_record_date = Record.where(stock: Stock.find_by(name: "SP10")).last.date
    number_of_records = Helper.business_days_between(last_sp10_record_date, Date.today)

    if number_of_records > 0
      sp500 = Stock.find_by(name: "SPX")
      stocks = Stock.where(in_fund: true)

      sp500.fetch_data

      stocks.each do |stock|
        stock.fetch_data
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
    format_data["link"] = "https://finance.yahoo.com/quote/#{self.name}/"
    format_data["position"] = self.position
    format_data["weight"] = self.weight ? self.weight : nil
    if record.price
      format_data["price"] = record.price.round(2)
      format_data["change_price"] = record.change_price.round(2)
    end
    format_data["change_percent"] = record.change_percent.round(2)
    
    format_data
  end

  def fetch_year_data
    year_data = Record.where(stock: self).order("date DESC")[0...252]
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
    year_data = Record.where(stock: self).order("date ASC")
    sp500 = Stock.find_by(name: "SPX")
    n = -1
    year_data.each do |record|
      history_record = {}
      sp500_record = Record.where(stock: sp500, date: record.date)[0]
      history_record["name"] = record.stock.name
      history_record["date"] = record.date.strftime("%a, %b %e, %Y")
      history_record["date_raw"] = record.date
      history_record["sp500_change_percent"] = sp500_record.change_percent.round(2)
      history_record["change_percent"] = record.change_percent.round(2)
      history_record["delta"] = (history_record["change_percent"] - history_record["sp500_change_percent"]).round(2)

      # parse constituents into json
      history_record["constituents"] = Constituents.parse(record)

      # checks data history to see if sp10 constituents have changed
      if n != 0
        changed_constituents = Constituents.check_change(year_data[n], record)
      end
      n = n + 1
      history_record["changed_constituents"] = changed_constituents

      daily_history_array << history_record
    end
    daily_history_array.reverse
  end

  def add_full_name
    if self.full_name === nil 
      full_name = AlphaVantage.full_name_search(self)
    
      self.update(full_name: full_name)
      puts "#{full_name} added to record!"
    else
      puts "Full name already exists"
    end
  end

  def fix_record(record)
    response = AlphaVantage.daily_fetch(self)

    n = 0
    response.each do |fetched_record|
      if Date.parse(fetched_record[0]) == record.date
        break
      end
      n = n + 1
    end
    today_index = n
    previous_index = n + 1

    fix_date = response.keys[today_index]
    previous_date = response.keys[previous_index]

    fix_date_record = response[fix_date]
    fix_date_price = fix_date_record["5. adjusted close"].to_f

    previous_date_record = response[previous_date]
    previous_date_price = previous_date_record["5. adjusted close"].to_f

    change_price = fix_date_price - previous_date_price
    change_percent = ((fix_date_price / previous_date_price) - 1) * 100

    record.update(price: fix_date_price, change_price: change_price, change_percent: change_percent)

    puts "#{self.name} record for #{record.date} succesfully updated!"
  end
end
