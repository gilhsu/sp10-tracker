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

  return (
    <div className="row stock-row">
      <div className="small-4 columns">{name}</div>
      <div className="small-4 columns text-right">{price}</div>
      <div className="small-4 columns text-right">{percentChange}</div>
    </div>
  );
};
