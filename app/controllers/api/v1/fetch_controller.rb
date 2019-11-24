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
    
    sp10_365 = sp10.fetch_365_data
    sp500_365 = sp500.fetch_365_data

    delta_365 = (sp10_365["change_percent"] - sp500_365["change_percent"]).round(2)

    sp10_daily_history = sp10.fetch_daily_history

    render json: {
      sp10: sp10_last_data,
      sp10_365: sp10_365,
      sp500: sp500_last_data,
      sp500_365: sp500_365,
      delta: delta_data,
      delta_365: delta_365,
      indivStockData: stocks_data,
      sp10_daily_history: sp10_daily_history,
    }
  end
end