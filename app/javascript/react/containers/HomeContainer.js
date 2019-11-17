import React, { Component } from "react";
import axios from "axios";
import StocksContainer from "./StocksContainer";
import Chart from "../tiles/Chart";
import Ticker from "../tiles/Ticker";
import DailyHistoryContainer from "./DailyHistoryContainer";

async function fetchSymbolData() {
  const key = "2NSG0O0E1I8ESDEZ";

  try {
    const response = await axios.get(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${key}`
    );

    console.log(response);
    return "hello";
  } catch (error) {
    console.error(error);
  }

  // axios
  //   .get(
  //     `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${key}`
  //   )
  //   .then(function(response) {
  //     // handle success
  //     console.log(response);
  //     const data = response.data["Global Quote"];
  //     const symbol = data["01. symbol"];
  //     const price = Number(data["05. price"]).toFixed(2);
  //     const date = data["07. latest trading day"];
  //     // const dateArray = Object.keys(data);
  //     const printData = `${date} - ${symbol} Closing Price: $${price}`;

  //     debugger;

  //     return printData;
  //   })
  //   .catch(function(error) {
  //     // handle error
  //     console.log(error);
  //   })
  //   .finally(function() {
  //     // always executed
  //   });
}

class HomeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spTen: 0,
      spTenSymbols: ["MSFT", "AAPL"]
    };
  }

  componentDidMount() {
    console.log(this.state.spTen);
  }

  buttonClick = () => {
    const data = this.state.spTenSymbols.map(symbol => {
      dataPrint = fetchSymbolData(symbol);
    });
    debugger;
    console.log(data);
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
          spTen: body.spTen
        });
      });
  };

  render() {
    return (
      <div>
        <div className="row" id="sp10-title">
          SP10
          <button onClick={this.buttonClick}>Fetch Data</button>
        </div>
        <div className="row">
          <div className="outline small-8 columns">
            <div className="row">
              <div className="outline small-6 columns">
                <Ticker />
              </div>
              <div className="outline small-6 columns">
                <Ticker />
              </div>
            </div>
            <div className="outline row">
              <Chart />
            </div>
          </div>
          <div className="outline small-4 columns">
            <StocksContainer />
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
