import React, { Component } from "react";
import axios from "axios";
import StocksContainer from "./StocksContainer";
import Chart from "../tiles/Chart";
import Ticker from "../tiles/Ticker";
import DailyHistoryContainer from "./DailyHistoryContainer";

const fetchSingleSymbol = async symbol => {
  const key = "2NSG0O0E1I8ESDEZ";

  try {
    const response = await axios.get(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${key}`
    );

    return response["data"]["Global Quote"];
  } catch (error) {
    console.error(error);
  }
};

const getAllSymbolData = async symbolList => {
  const dataArray = [];
  const stock1 = await fetchSingleSymbol(symbolList[0]);
  dataArray.push(stock1);
  const stock2 = await fetchSingleSymbol(symbolList[1]);
  dataArray.push(stock2);
  const stock3 = await fetchSingleSymbol(symbolList[2]);
  dataArray.push(stock3);
  const stock4 = await fetchSingleSymbol(symbolList[3]);
  dataArray.push(stock4);
  const stock5 = await fetchSingleSymbol(symbolList[4]);
  dataArray.push(stock5);
  // const stock6 = await fetchSingleSymbol(symbolList[5]);
  // dataArray.push(stock6);
  // const stock7 = await fetchSingleSymbol(symbolList[6]);
  // dataArray.push(stock7);
  // const stock8 = await fetchSingleSymbol(symbolList[7]);
  // dataArray.push(stock8);
  // const stock9 = await fetchSingleSymbol(symbolList[8]);
  // dataArray.push(stock9);
  // const stock10 = await fetchSingleSymbol(symbolList[9]);
  // dataArray.push(stock10);
  // const stock11 = await fetchSingleSymbol(symbolList[10]);
  // dataArray.push(stock11);

  return await dataArray;
};

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
      fetchedData: [],
      sp500: {},
      sp10: {}
    };
    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    console.log(this.state.fetchedData);
    console.log(this.state.sp500);
    console.log(this.state.sp10);
  }

  componentDidUpdate() {
    console.log(this.state.fetchedData);
    console.log(this.state.sp500);
    console.log(this.state.sp10);
  }

  buttonClick = async () => {
    this.fetchData(this.state.symbolList);

    // getAllSymbolData(this.state.symbolList.slice(0, 5)).then(data => {
    //   console.log(data);
    //   this.setState({ fetchedData: data });
    // });

    // console.log("start 60 seconds");
    // setTimeout(function() {
    //   console.log("waited 60 seconds");
    // }, 60000);

    // getAllSymbolData(this.state.symbolList.slice(0, 5)).then(data => {
    //   console.log(data);
    //   this.setState({ fetchedData: data });
    // });

    // const a = await setTimeout(() => {
    //   getAllSymbolData(this.state.symbolList).then(data => {
    //     console.log(data);
    //     this.setState({ symbolData: data });
    //   });
    // }, 5000);

    // console.log(a);

    // const b = await setTimeout(() => {
    //   getAllSymbolData(this.state.symbolList).then(data => {
    //     console.log(data);
    //     this.setState({ symbolData: data });
    //   });
    // }, 5000);

    // console.log(b);

    // console.log(this.state.symbolData);
  };

  testClick = () => {
    const cheese = this.state.symbolList.map(symbol => {
      return `${symbol} is great`;
    });
    console.log(cheese);
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
          fetchedData: body.fetchedData,
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
