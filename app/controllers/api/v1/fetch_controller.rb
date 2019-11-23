class Api::V1::FetchController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def create
    sp10_last_data = {}
    sp10 = Stock.find_by(name: "SP10")
    sp10_last_record = Record.where(stock: sp10).last
    sp10_last_data["date"] = sp10_last_record.date
    sp10_last_data["name"] = sp10.name
    sp10_last_data["change_percent"] = sprintf('%.2f', sp10_last_record.change_percent)

    sp500_last_data = {}
    sp500 = Stock.find_by(name: "SPX")
    sp500_last_record = Record.where(stock: sp500).last
    sp500_last_data["date"] = sp500_last_record.date
    sp500_last_data["name"] = sp500.name
    sp500_last_data["price"] = sprintf('%.2f', sp500_last_record.price)
    sp500_last_data["change_price"] = sprintf('%.2f', sp500_last_record.change_price)
    sp500_last_data["change_percent"] = sprintf('%.2f', sp500_last_record.change_percent)

    delta = sp10_last_record.change_percent.round(2) - sp500_last_record.change_percent.round(2)
    format_delta = sprintf('%.2f', delta)

    stocks = Stock.where(in_fund: true)
    symbols_data = []
    stocks.each do |stock|
      format_data = {}
      record  = Record.where(stock: stock).last
      format_data["date"] = record.date
      format_data["symbol"] = stock.name
      format_data["price"] = sprintf('%.2f', record.price)
      format_data["change_price"] = sprintf('%.2f', record.change_price)
      format_data["change_percent"] = sprintf('%.2f', record.change_percent)
      symbols_data << format_data
    end

    render json: {
      sp10: sp10_last_data,
      sp500: sp500_last_data,
      indivStockData: symbols_data,
      delta: format_delta
    }
  end
end