class Api::V1::FetchController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def create

    symbols_data = []

    symbols_sp500 = []
    symbols_sp500 << params["_json"][0]
    # sp10 list is broken up into groups of 5 because the API limits 5 calls per minute
    symbols_first_five = params["_json"][1...6]
    symbols_last_five = params["_json"][6...11]

    sp500_data = fetch_symbols_data(symbols_sp500)
    
    timer(60)
    
    symbols_first_five_data = fetch_symbols_data(symbols_first_five)
    
    symbols_first_five_data.each do |symbol_data|
      symbols_data << symbol_data
    end
    
    timer(60)
    
    symbols_last_five_data = fetch_symbols_data(symbols_last_five)

    symbols_last_five_data.each do |symbol_data|
      symbols_data << symbol_data
    end

    sp10_data = get_sp10_data(symbols_data)

    render json: {
      sp10: sp10_data,
      sp500: sp500_data[0],
      fetchedData: symbols_data
    }
  end

  def get_sp10_data(stock_data_array)
    percentage_return_sum = 0
    stock_data_array.each do |stock_data|
      percentage_return_sum = percentage_return_sum + stock_data["change-percent"].to_f
    end

    sp10_percentage_return = (percentage_return_sum / 10).round(2)

    sp10_data = {}
    sp10_data["date"] = stock_data_array[0]["date"]
    sp10_data["symbol"] = "SP10"
    sp10_data["change-percent"] = sp10_percentage_return

    sp10_data
  end

  def fetch_symbols_data(symbols_array)
    key1 = "2NSG0O0E1I8ESDEZ"
    key2 = "GPVI77SN18N0LB1J"
    key3 = "7FTS2A6T4HRYU6MC"
    endpoint = "https://www.alphavantage.co/"
    symbols_data = []

    symbols_array.each do |symbol| 
      request_url = "#{endpoint}query?function=GLOBAL_QUOTE&symbol=#{symbol}&apikey=#{key1}"
      response_raw = HTTParty.get(request_url)
      format_data = {}
      format_data["date"] = response_raw["Global Quote"]["07. latest trading day"]
      format_data["symbol"] = response_raw["Global Quote"]["01. symbol"]
      format_data["price"] = response_raw["Global Quote"]["05. price"]
      format_data["change-percent"] = response_raw["Global Quote"]["10. change percent"].to_f.round(2)

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