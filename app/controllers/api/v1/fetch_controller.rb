class Api::V1::FetchController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def create
    sp10 = Stock.find_by(name: "SP10")
    sp10_last_data = sp10.fetch_data
    
    sp500 = Stock.find_by(name: "SPX")
    sp500_last_data = sp500.fetch_data

    stocks = Stock.where(in_fund: true)
    stocks_data = []
    stocks.each do |stock|
      stocks_data << stock.fetch_data
    end

    delta = sp10_last_data["change_percent"].to_f - sp500_last_data["change_percent"].to_f
    delta_data = sprintf('%.2f', delta)
    
    sp10_365 = sp10.fetch_365_data
    sp500_365 = sp500.fetch_365_data

    delta_365 = sprintf('%.2f', sp10_365["change_percent"].to_f - sp500_365["change_percent"].to_f)

    render json: {
      sp10: sp10_last_data,
      sp10_365: sp10_365,
      sp500: sp500_last_data,
      sp500_365: sp500_365,
      indivStockData: stocks_data,
      delta: delta_data,
      delta_365: delta_365
    }
  end
end