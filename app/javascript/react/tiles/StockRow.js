import React from "react";

export const StockRow = ({ stockData }) => {
  const fullName = stockData["full_name"];
  const weight = stockData["weight"];
  const link = stockData["link"];
  const change_percent = stockData["change_percent"];

  const displayChangePercent =
    change_percent >= 0 ? (
      <span className="stock-row-percent-green">
        +{change_percent.toFixed(2)}%
      </span>
    ) : (
      <span className="stock-row-percent-red">
        {change_percent.toFixed(2)}%
      </span>
    );

  const stockLink = () => {
    window.open(`${link}`, "_blank");
  };

  return (
    <div className="stock-row-container" onClick={stockLink}>
      <div className="row stock-row">
        <div className="small-7 columns">{fullName}</div>
        <div className="small-5 columns">
          <div className="space-between">
            <span className="stock-row-symbol text-center">
              {weight.toFixed(2)}%
            </span>
            <span className="text-center">{displayChangePercent}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
