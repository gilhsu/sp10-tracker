import React from "react";

export const StockRow = ({ stockData }) => {
  const fullName = stockData["full_name"];
  const name = stockData["name"];
  const weight = `${stockData["weight"].toFixed(2)}%`;

  const percentChange =
    stockData["change_percent"] >= 0 ? (
      <span className="stock-row-percent-green">
        +{stockData["change_percent"].toFixed(2)}%
      </span>
    ) : (
      <span className="stock-row-percent-red">
        {stockData["change_percent"].toFixed(2)}%
      </span>
    );

  const stockLink = () => {
    window.open(`https://finance.yahoo.com/quote/${name}/`, "_blank");
  };

  return (
    <div className="stock-row-container" onClick={stockLink}>
      <div className="row stock-row">
        <div className="small-7 columns">{fullName}</div>
        <div className="small-5 columns">
          <div className="space-between">
            <span className="stock-row-symbol text-center">{weight}</span>
            <span className="text-center">{percentChange}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
