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

    last_sp10_record = Record.where(stock: sp10).order('date ASC').last
    last_sp10_record_date_string = last_sp10_record.date.strftime('%A, %b %e, %Y')

    chart_data_20 = get_10k_data(20)
    chart_data_62 = get_10k_data(62)
    chart_data_125 = get_10k_data(125)
    chart_data_253 = get_10k_data(253)

    render json: {
      sp10: sp10_last_data,
      sp10_year: sp10_year,
      sp500: sp500_last_data,
      sp500_year: sp500_year,
      delta: delta_data,
      delta_year: delta_year,
      indivStockData: stocks_data,
      sp10_daily_history: sp10_daily_history,
      last_update: last_sp10_record_date_string,
      chartData20: chart_data_20,
      chartData62: chart_data_62,
      chartData125: chart_data_125,
      chartData253: chart_data_253
    }
  end

  def get_10k_data(number_of_days)
    sp10 = Stock.find_by(name: "SP10")
    sp10_records = Record.where(stock: sp10).order("date ASC")
    sp10_records_range = sp10_records[sp10_records.length - number_of_days, sp10_records.length]

    sp500 = Stock.find_by(name: "SPX")
    sp500_records = Record.where(stock: sp500).order("date ASC")
    sp500_records_range = sp500_records[sp500_records.length - number_of_days, sp500_records.length]
    
    combined_10k_data = []
    sp10_10k_value = 10000
    sp500_10k_value = 10000

    n = 0
    sp10_records_range.length.times do
      if n === 0
        data = {}
        data["date"] = sp10_records_range[n].date.strftime("%m/%d/%y")
        data["date_format"] = sp10_records_range[n].date.strftime("%a, %b %e, %Y")

        data["sp10_value"] = sp10_10k_value
        data["sp10_value_rounded"] = sp10_10k_value
        data["sp10_change_percent"] = 0
        data["sp10_delta"] = 0

        data["sp500_value"] = sp500_10k_value
        data["sp500_value_rounded"] = sp500_10k_value
        data["sp500_change_percent"] = 0

        combined_10k_data << data
        n = n + 1
      else
        data = {}
        data["date"] = sp10_records_range[n].date.strftime("%m/%d/%y")
        data["date_format"] = sp10_records_range[n].date.strftime("%a, %b %e, %Y")
        sp10_change_percent = sp10_records_range[n].change_percent
        sp500_change_percent = sp500_records_range[n].change_percent

        sp10_10k_value = sp10_10k_value * ((sp10_change_percent / 100) + 1)
        data["sp10_value"] = sp10_10k_value
        data["sp10_value_rounded"] = sp10_10k_value.round(2)
        data["sp10_change_percent"] = sp10_change_percent.round(2)
        data["sp10_delta"] = sp10_change_percent.round(2) - sp500_change_percent.round(2)

        sp500_10k_value = sp500_10k_value * ((sp500_change_percent / 100) + 1)
        data["sp500_value"] = sp500_10k_value
        data["sp500_value_rounded"] = sp500_10k_value.round(2)
        data["sp500_change_percent"] = sp500_change_percent.round(2)

        combined_10k_data << data
        n = n + 1
      end
    end

    combined_10k_data
  end
end