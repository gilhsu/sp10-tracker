import React, { Component } from "react";
import { StockRow } from "../tiles/StockRow";

export const StocksContainer = props => {
  let n = 0;
  const displayStocks =
    props.stockData && props.stockData.length > 0
      ? props.stockData.map(stockData => {
          n = n + 1;
          return <StockRow key={n} stockData={stockData} />;
        })
      : "no stock data yet";

  return (
    <div>
      <div>Individual Stocks</div>
      <div>{displayStocks}</div>
    </div>
  );
};
