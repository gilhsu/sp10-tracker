import React, { Component } from "react";
import StockRow from "../tiles/StockRow";

class StocksContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        Hello from Stocks Container
        <StockRow />
        <StockRow />
        <StockRow />
        <StockRow />
        <StockRow />
        <StockRow />
        <StockRow />
      </div>
    );
  }
}

export default StocksContainer;
