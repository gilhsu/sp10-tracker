import React from "react";

export const StockRow = props => {
  const name = props.stockData["name"];

  const price = `$${props.stockData["price"].toFixed(2)}`;

  const percentChange =
    props.stockData["change_percent"] >= 0 ? (
      <span className="green">
        +{props.stockData["change_percent"].toFixed(2)}%
      </span>
    ) : (
      <span className="red">
        {props.stockData["change_percent"].toFixed(2)}%
      </span>
    );

  return (
    <div className="row">
      <div className="small-4 columns">{name}</div>
      <div className="small-4 columns center">{price}</div>
      <div className="small-4 columns right">{percentChange}</div>
    </div>
  );
};
