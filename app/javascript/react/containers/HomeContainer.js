import React, { Component } from "react";
import axios from "axios";
import StocksContainer from "./StocksContainer";
import Chart from "../tiles/Chart";
import Ticker from "../tiles/Ticker";
import DailyHistoryContainer from "./DailyHistoryContainer";

class HomeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      symbolList: [
        "SPX",
        "MSFT",
        "AAPL",
        "AMZN",
        "FB",
        "BRK-B",
        "GOOG",
        "GOOGL",
        "JPM",
        "JNJ",
        "V"
      ],
      indivStockData: [],
      sp500: {},
      sp500_year: {},
      sp10: {},
      sp10_year: {},
      delta: "",
      delta_year: "",
      sp10_daily_history: []
    };
  }

  componentDidMount() {
    this.fetchData(this.state.symbolList);
  }

  componentDidUpdate() {}

  fetchData = symbolList => {
    fetch(`/api/v1/fetch/`, {
      method: "POST",
      body: JSON.stringify(symbolList),
      credentials: "same-origin",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
          throw error;
        }
      })
      .then(response => response.json())
      .then(body => {
        this.setState({
          indivStockData: body.indivStockData,
          sp500: body.sp500,
          sp500_year: body.sp500_year,
          sp10: body.sp10,
          sp10_year: body.sp10_year,
          delta: body.delta,
          delta_year: body.delta_year,
          sp10_daily_history: body.sp10_daily_history
        });
      });
  };

  render() {
    return (
      <div>
        <div className="row" id="sp10-title">
          <div className="small-6 columns">SP10</div>
        </div>
        <div className="row">
          <div className="outline small-8 columns">
            <div className="row">
              <div className="outline small-6 columns">
                Today
                <Ticker
                  sp10={this.state.sp10}
                  sp500={this.state.sp500}
                  delta={this.state.delta}
                />
              </div>
              <div className="outline small-6 columns">
                Last Year (253 Trading Days)
                <Ticker
                  sp10={this.state.sp10_year}
                  sp500={this.state.sp500_year}
                  delta={this.state.delta_year}
                />
              </div>
            </div>
            <div className="outline row">
              <Chart />
            </div>
          </div>
          <div className="outline small-4 columns">
            <StocksContainer stockData={this.state.indivStockData} />
          </div>
          <div className="outline">
            <DailyHistoryContainer
              sp10_daily_history={this.state.sp10_daily_history}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default HomeContainer;
