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
      indivStockData: [
        {
          date: "2019-11-18",
          symbol: "MSFT",
          price: "150.34",
          change_price: "0.37",
          change_percent: "0.25"
        },
        {
          date: "2019-11-18",
          symbol: "AAPL",
          price: "267.10",
          change_price: "1.34",
          change_percent: "0.50"
        },
        {
          date: "2019-11-18",
          symbol: "AMZN",
          price: "1752.53",
          change_price: "13.04",
          change_percent: "0.75"
        },
        {
          date: "2019-11-18",
          symbol: "FB",
          price: "197.40",
          change_price: "2.30",
          change_percent: "1.18"
        },
        {
          date: "2019-11-18",
          symbol: "BRK-B",
          price: "219.35",
          change_price: "-0.39",
          change_percent: "-0.18"
        },
        {
          date: "2019-11-18",
          symbol: "GOOG",
          price: "1320.70",
          change_price: "-14.17",
          change_percent: "-1.06"
        },
        {
          date: "2019-11-18",
          symbol: "GOOGL",
          price: "1319.84",
          change_price: "-13.70",
          change_percent: "-1.03"
        },
        {
          date: "2019-11-18",
          symbol: "JPM",
          price: "130.62",
          change_price: "1.09",
          change_percent: "0.84"
        },
        {
          date: "2019-11-18",
          symbol: "JNJ",
          price: "134.83",
          change_price: "-0.11",
          change_percent: "-0.08"
        },
        {
          date: "2019-11-18",
          symbol: "V",
          price: "179.66",
          change_price: "-0.11",
          change_percent: "-0.06"
        }
      ],
      sp500: {
        date: "2019-11-18",
        symbol: "SPX",
        price: "3122.03",
        change_price: "1.57",
        change_percent: "0.05"
      },
      sp10: { date: "2019-11-18", symbol: "SP10", change_percent: "0.11" }
    };
  }

  componentDidMount() {
    console.log(this.state.indivStockData);
    console.log(this.state.sp500);
    console.log(this.state.sp10);
  }

  componentDidUpdate() {
    console.log(this.state.indivStockData);
    console.log(this.state.sp500);
    console.log(this.state.sp10);
  }

  buttonClick = async () => {
    this.fetchData(this.state.symbolList);
  };

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
          sp10: body.sp10
        });
      });
  };

  render() {
    return (
      <div>
        <div className="row" id="sp10-title">
          <div className="small-6 columns">SP10</div>
          <div className="small-6 columns right">
            <button onClick={this.buttonClick}>Fetch Data</button>
          </div>
        </div>
        <div className="row">
          <div className="outline small-8 columns">
            <div className="row">
              <div className="outline small-6 columns">
                Today
                <Ticker sp10={this.state.sp10} sp500={this.state.sp500} />
              </div>
              <div className="outline small-6 columns">
                Last 365 Days
                <Ticker sp10={this.state.sp10} sp500={this.state.sp500} />
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
            <DailyHistoryContainer />
          </div>
        </div>
      </div>
    );
  }
}

export default HomeContainer;
