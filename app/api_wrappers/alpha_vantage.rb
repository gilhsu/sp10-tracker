module AlphaVantage
  class << self
    def daily_fetch(stock)
      puts "Fetching data..."
      fetched_data = api_fetch(stock)

      valid_data = validate_data(fetched_data)
      while !valid_data
        fetched_data = api_fetch(stock)
        valid_data = validate_data(fetched_data)
      end

      return valid_data
    end

    def api_fetch(stock)
      endpoint = "https://www.alphavantage.co/"
      output_size = "full"

      request_url = "#{endpoint}query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=#{stock.name}&outputsize=#{output_size}&apikey=#{ENV["API_KEY1"]}"

      response_raw = HTTParty.get(request_url)
      fetched_data = response_raw["Time Series (Daily)"]

      while !fetched_data
        puts "Fetch limit reached."
        Helper.timer(70)
        response_raw = HTTParty.get(request_url)
        fetched_data = response_raw["Time Series (Daily)"]
      end

      return fetched_data
    end

    def validate_data(fetched_data)
      first_value = fetched_data[fetched_data.keys[0]]["5. adjusted close"].to_f
      n = 1
      10.times do
        next_value = fetched_data[fetched_data.keys[n]]["5. adjusted close"].to_f
        if (next_value / first_value) > 2 || (first_value / next_value) < 0.5
          puts "Data not valid. Refetching..."
          return nil
        end
        n += 1
      end
      return fetched_data
    end
  end
end