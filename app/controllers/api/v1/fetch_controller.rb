class Api::V1::FetchController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def create
    sp10 = Stock.find_by(name: "SP10")
    sp10_last_data = sp10.fetch_last_data
    
    sp500 = Stock.find_by(name: "SPX")
    sp500_last_data = sp500.fetch_last_data

    stocks = Stock.where(in_fund: true)
    stocks_data = []
    stocks.each do |stock|
      stocks_data << stock.fetch_last_data
    end

    delta = sp10_last_data["change_percent"].to_f - sp500_last_data["change_percent"].to_f
    delta_data = delta.round(2)
    
    sp10_year = sp10.fetch_year_data
    sp500_year = sp500.fetch_year_data

    delta_year = (sp10_year["change_percent"] - sp500_year["change_percent"]).round(2)

    sp10_daily_history = sp10.fetch_daily_history

    render json: {
      sp10: sp10_last_data,
      sp10_year: sp10_year,
      sp500: sp500_last_data,
      sp500_year: sp500_year,
      delta: delta_data,
      delta_year: delta_year,
      indivStockData: stocks_data,
      sp10_daily_history: sp10_daily_history,
    }
  end
end