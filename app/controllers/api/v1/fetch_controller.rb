class Api::V1::FetchController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def create
    sp10 = Stock.find_by(name: "SP10")
    sp10_last_data = sp10.format_data
    
    sp500 = Stock.find_by(name: "SPX")
    sp500_last_data = sp500.format_data

    stocks = Stock.where(in_fund: true)
    stocks_data = []
    stocks.each do |stock|
      stocks_data << stock.format_data
    end

    delta = sp10_last_data["change_percent"].to_f - sp500_last_data["change_percent"].to_f
    format_delta = sprintf('%.2f', delta)

    
    sp10_365_data = Record.where(stock: sp10).reverse[0...365]
    sp10_365_data_reverse = sp10_365_data.reverse
    change_percent_total = 1
    change_percent_array = []
    sp10_365_data_reverse.each do |record|
      change_percent_total = change_percent_total * (1 + (record.change_percent / 100))
      change_percent_array << 1 + (record.change_percent / 100)
    end

    sp10_365 = {}
    sp10_365["change_percent"] = sprintf('%.2f', (change_percent_total - 1) * 100)

    binding.pry
    render json: {
      sp10: sp10_last_data,
      sp10_365: sp10_365,
      sp500: sp500_last_data,
      indivStockData: stocks_data,
      delta: format_delta
    }
  end
end