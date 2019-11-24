import React from "react";

const StockRow = props => {
  const name = props.stockData["name"];

  const price = `$${props.stockData["price"]}`;

  const percentChange =
    props.stockData["change_percent"] >= 0 ? (
      <span className="green">+{props.stockData["change_percent"]}%</span>
    ) : (
      <span className="red">{props.stockData["change_percent"]}%</span>
    );

  return (
    <div className="row">
      <div className="small-4 columns">{name}</div>
      <div className="small-4 columns right">{percentChange}</div>
      <div className="small-4 columns right">{price}</div>
    </div>
  );
};

export default StockRow;
