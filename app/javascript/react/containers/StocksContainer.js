import React, { Component } from "react";
import StockRow from "../tiles/StockRow";

class StocksContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log(this.props.stockData);

    const displayStocks =
      this.props.stockData.length > 0
        ? this.props.stockData.map(stockData => {
            return (
              <StockRow
                key={Math.floor(Math.random() * 100000)}
                stockData={stockData}
              />
            );
          })
        : "no stock data yet";

    console.log(displayStocks);

    return (
      <div>
        Hello from Stocks Container
        <div>{displayStocks}</div>
      </div>
    );
  }
}

export default StocksContainer;
