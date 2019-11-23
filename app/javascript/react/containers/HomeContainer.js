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
      sp500_365: {},
      sp10: {},
      sp10_365: {},
      delta: "",
      delta_365: ""
    };
  }

  componentDidMount() {
    this.fetchData(this.state.symbolList);
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
          sp500_365: body.sp500_365,
          sp10: body.sp10,
          sp10_365: body.sp10_365,
          delta: body.delta,
          delta_365: body.delta_365
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
                <Ticker
                  sp10={this.state.sp10}
                  sp500={this.state.sp500}
                  delta={this.state.delta}
                />
              </div>
              <div className="outline small-6 columns">
                Last 365 Days
                <Ticker
                  sp10={this.state.sp10_365}
                  sp500={this.state.sp500_365}
                  delta={this.state.delta_365}
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
            <DailyHistoryContainer />
          </div>
        </div>
      </div>
    );
  }
}

export default HomeContainer;
