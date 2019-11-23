class Api::V1::FetchController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def create

    # symbols_data = []

    # symbols_sp500 = []
    # symbols_sp500 << params["_json"][0]
    # # sp10 list is broken up into groups of 5 because the API limits 5 calls per minute
    # symbols_first_five = params["_json"][1...6]
    # symbols_last_five = params["_json"][6...11]

    # sp500_data = fetch_symbols_data(symbols_sp500)
    
    # timer(60)
    
    # symbols_first_five_data = fetch_symbols_data(symbols_first_five)
    
    # symbols_first_five_data.each do |symbol_data|
    #   symbols_data << symbol_data
    # end
    
    # timer(60)
    
    # symbols_last_five_data = fetch_symbols_data(symbols_last_five)

    # symbols_last_five_data.each do |symbol_data|
    #   symbols_data << symbol_data
    # end

    # sp10_data = get_sp10_data(symbols_data)


    sp10_last_data = {}
    sp10 = Stock.find_by(name: "SP10")
    sp10_last_record = Record.where(stock: sp10).last
    sp10_last_data["date"] = sp10_last_record.date
    sp10_last_data["name"] = sp10.name
    sp10_last_data["change_percent"] = sp10_last_record.change_percent

    sp500_last_data = {}
    sp500 = Stock.find_by(name: "SPX")
    sp500_last_record = Record.where(stock: sp500).last
    sp500_last_data["date"] = sp500_last_record.date
    sp500_last_data["name"] = sp500.name
    sp500_last_data["price"] = sp500_last_record.price
    sp500_last_data["change_price"] = sp500_last_record.change_price
    sp500_last_data["change_percent"] = sp500_last_record.change_percent

    stocks = Stock.where(in_fund: true)
    symbols_data = []
    stocks.each do |stock|
      format_data = {}
      record  = Record.where(stock: stock).last
      format_data["date"] = record.date
      format_data["name"] = stock.name
      format_data["price"] = record.price
      format_data["change_price"] = record.change_price
      format_data["change_percent"] = record.change_percent
      symbols_data << format_data
    end

    binding.pry

    render json: {
      sp10: sp10_last_data,
      sp500: sp500_last_data,
      indivStockData: symbols_data
    }
  end

  def get_sp10_data(stock_data_array)
    percentage_return_sum = 0
    stock_data_array.each do |stock_data|
      percentage_return_sum = percentage_return_sum + stock_data["change_percent"].to_f
    end

    sp10_percentage_return = sprintf('%.2f', percentage_return_sum / 10)

    sp10_data = {}
    sp10_data["date"] = stock_data_array[0]["date"]
    sp10_data["symbol"] = "SP10"
    sp10_data["change_percent"] = sp10_percentage_return

    sp10_data
  end

  def fetch_symbols_data(symbols_array, full_year = false)
    key1 = "2NSG0O0E1I8ESDEZ"
    key2 = "GPVI77SN18N0LB1J"
    key3 = "7FTS2A6T4HRYU6MC"
    endpoint = "https://www.alphavantage.co/"
    symbols_data = []

    output_size = full_year ? "full" : "compact"

    symbols_array.each do |symbol| 
      request_url = "#{endpoint}query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=#{symbol}&outputsize=#{output_size}&apikey=#{key1}"
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
      
      symbols_data << format_data
    end

    symbols_data
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

end