import React from "react";

const StockRow = props => {
  const symbol = props.stockData["symbol"];

  const price = `$${props.stockData["price"]}`;

  const percentChange =
    props.stockData["change_percent"] > 0
      ? `+${props.stockData["change_percent"]}%`
      : `${props.stockData["change_percent"]}%`;

  console.log("props.stockData");
  console.log(props.stockData);

  return (
    <div className="row">
      <div className="small-4 columns">{symbol}</div>
      <div className="small-4 columns right">{percentChange}</div>
      <div className="small-4 columns right">{price}</div>
    </div>
  );
};

export default StockRow;
