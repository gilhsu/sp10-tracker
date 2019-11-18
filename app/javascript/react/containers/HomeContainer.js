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
          date: "2019-11-15",
          symbol: "MSFT",
          price: 149.97,
          "change-percent": 1.29
        },
        {
          date: "2019-11-15",
          symbol: "AAPL",
          price: 265.76,
          "change-percent": 1.19
        },
        {
          date: "2019-11-15",
          symbol: "AMZN",
          price: 1739.49,
          "change-percent": -0.86
        },
        {
          date: "2019-11-15",
          symbol: "FB",
          price: 195.1,
          "change-percent": 1.01
        },
        {
          date: "2019-11-15",
          symbol: "BRK-B",
          price: 219.74,
          "change-percent": 0.17
        },
        {
          date: "2019-11-15",
          symbol: "GOOG",
          price: 1334.87,
          "change-percent": 1.79
        },
        {
          date: "2019-11-15",
          symbol: "GOOGL",
          price: 1333.54,
          "change-percent": 1.86
        },
        {
          date: "2019-11-15",
          symbol: "JPM",
          price: 129.53,
          "change-percent": 0.72
        },
        {
          date: "2019-11-15",
          symbol: "JNJ",
          price: 134.94,
          "change-percent": 3.04
        },
        {
          date: "2019-11-15",
          symbol: "V",
          price: 179.77,
          "change-percent": 0.01
        }
      ],
      sp500: {
        date: "2019-11-15",
        symbol: "INX",
        price: 3120.46,
        "change-percent": 0.77
      },
      sp10: { date: "2019-11-15", symbol: "SP10", "change-percent": 1.02 }
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
          SP10
          <button onClick={this.buttonClick}>Fetch Data</button>
          <button onClick={this.testClick}>Test Click</button>
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
