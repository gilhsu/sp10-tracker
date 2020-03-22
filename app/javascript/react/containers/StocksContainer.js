import React, { Component } from "react";
import { StockRow } from "../tiles/StockRow";

export const StocksContainer = ({ loading, stockData }) => {
  let n = 0;

  const stockRows =
    stockData &&
    stockData.map(stockDatum => {
      n = n + 1;
      return <StockRow key={n} stockData={stockDatum} />;
    });

  let loadingRows = [];
  for (let i = 0; i < 10; i++) {
    loadingRows.push(
      <div key={i} className="stock-row-container">
        <div className="row stock-row">
          <div className="loading" style={{ height: "19px" }} />
        </div>
      </div>
    );
  }

  const displayStocks = loading ? loadingRows : stockRows;

  return (
    <div>
      <div className="section-title section-title-no-bottom">Constituents</div>
      <div>{displayStocks}</div>
    </div>
  );
};
