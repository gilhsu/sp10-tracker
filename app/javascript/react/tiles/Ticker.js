import React from "react";

export const Ticker = props => {
  let sp10PercentChange = "No Data";
  let sp500PercentChange = "No Data";
  let displayDeltaPercentage = "No Data";
  if (props.sp10 && props.sp10["change_percent"]) {
    sp10PercentChange =
      props.sp10["change_percent"] >= 0 ? (
        <span className="green">
          +{props.sp10["change_percent"].toFixed(2)}%
        </span>
      ) : (
        <span className="red">{props.sp10["change_percent"].toFixed(2)}%</span>
      );

    sp500PercentChange =
      props.sp500["change_percent"] >= 0 ? (
        <span className="green">
          +{props.sp500["change_percent"].toFixed(2)}%
        </span>
      ) : (
        <span className="red">{props.sp500["change_percent"].toFixed(2)}%</span>
      );

    displayDeltaPercentage =
      props.delta >= 0 ? (
        <span className="green">+{props.delta.toFixed(2)}%</span>
      ) : (
        <span className="red">{props.delta.toFixed(2)}%</span>
      );
  }

  return (
    <div className="row">
      <div className="small-4 columns">
        <span className="ticker-number">{sp10PercentChange}</span>
        <br />
        <span className="ticker-name">SP10</span>
      </div>
      <div className="small-4 columns">
        <span className="ticker-number">{sp500PercentChange}</span>
        <br />
        <span className="ticker-name">S&P 500</span>
      </div>
      <div className="small-4 columns">
        <span className="ticker-number">{displayDeltaPercentage}</span>
        <br />
        <span className="ticker-name">Delta</span>
      </div>
    </div>
  );
};
