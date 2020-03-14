import React, { Component } from "react";
import { StockRow } from "../tiles/StockRow";

export const StocksContainer = ({ stockData }) => {
  let n = 0;
  const displayStocks = stockData.map(stockDatum => {
    n = n + 1;
    return <StockRow key={n} stockData={stockDatum} />;
  });

  return (
    <div>
      <div className="section-title section-title-no-bottom">Constituents</div>
      <div>{displayStocks}</div>
    </div>
  );
};
