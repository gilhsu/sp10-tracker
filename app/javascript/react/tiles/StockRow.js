import React from "react";

export const StockRow = ({ stockData }) => {
  const name = stockData["name"];
  const fullName = stockData["full_name"];

  const price = `$${stockData["price"].toFixed(2)}`;

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
    window.open(
      `https://finance.yahoo.com/quote/${name}?p=${name}&.tsrc=fin-srch`,
      "_blank"
    );
  };

  return (
    <div className="stock-row-container" onClick={stockLink}>
      <div className="row stock-row">
        <div className="small-7 columns">{fullName}</div>
        <div className="small-5 columns">
          <div className="data-equal">
            <span className="stock-row-symbol text-center">{name}</span>
            <span className="text-center">{percentChange}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
