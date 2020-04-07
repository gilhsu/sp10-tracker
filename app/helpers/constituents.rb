module Constituents
  class << self
    def check_stock_positions
      puts "Checking today SP10 constituents..."
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
      puts "Today's SP10 constituents updated!"
    end

    def check_change(previous_record, current_record)
      previous_record_constituents = []
      previous_record.constituents.each do |record|
        parsed_record = JSON.parse(record)
        previous_record_constituents << parsed_record["symbol"]
      end

      current_record_constituents = []
      current_record.constituents.each do |record|
        parsed_record = JSON.parse(record)
        current_record_constituents << parsed_record["symbol"]
      end

      previous_record_constituents.each do |symbol|
        if !current_record_constituents.include? symbol
          return true
        end
      end
      return false
    end
    
    def parse(record)
      constituents_array = []
      record.constituents.each do |constituent|
        parsed_constituent = JSON.parse(constituent)
        constituents_array << parsed_constituent
      end
      constituents_array
    end

    def get(date, override = false)
      constituents = []
      if date == Date.today || override == true
        date_records = Record.where(date: date)

        # build raw constituents array
        temp_constituents = []
        date_records.each do |record|
          indiv_constituent = {}
          if record.stock.name != "SP10" && record.stock.name != "SPX"
            indiv_constituent["symbol"] = record.stock.full_name
            indiv_constituent["position"] = record.stock.position
            indiv_constituent["weight"] = record.stock.weight
            temp_constituents << indiv_constituent
          end
        end

        # sort by position
        sort_temp_constituents = temp_constituents.sort_by { |constituent| constituent["position"] }

        # format constituents to json
        sort_temp_constituents.each do |constituent|
          constituents << constituent.to_json
        end
      end

      constituents
    end
  end
end