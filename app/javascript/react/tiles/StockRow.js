import React from "react";

export const StockRow = ({ stockData }) => {
  const name = stockData["name"];

  const price = `$${stockData["price"].toFixed(2)}`;

  const percentChange =
    stockData["change_percent"] >= 0 ? (
      <span className="green">+{stockData["change_percent"].toFixed(2)}%</span>
    ) : (
      <span className="red">{stockData["change_percent"].toFixed(2)}%</span>
    );

  const stockLink = () => {
    window.open(
      `https://finance.yahoo.com/quote/${name}?p=${name}&.tsrc=fin-srch`,
      "_blank"
    );
  };

  return (
    <div className="stock-row-container" onClick={stockLink}>
      <div className="row stock-row">
        <div className="small-4 columns">{name}</div>
        <div className="small-4 columns text-right">{price}</div>
        <div className="small-4 columns text-right">{percentChange}</div>
      </div>
    </div>
  );
};
