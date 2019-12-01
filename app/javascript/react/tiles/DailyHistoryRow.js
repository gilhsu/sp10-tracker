import React from "react";

export const DailyHistoryRow = props => {
  let date = "N/A";
  let percentChange = "N/A";
  let sp500PercentChange = "N/A";
  let delta = "N/A";
  if (props.data) {
    date = props.data["date"];
    percentChange =
      props.data["change_percent"] >= 0 ? (
        <span className="green">
          +{props.data["change_percent"].toFixed(2)}%
        </span>
      ) : (
        <span className="red">{props.data["change_percent"].toFixed(2)}%</span>
      );
    sp500PercentChange =
      props.data["sp500_change_percent"] >= 0 ? (
        <span className="green">
          +{props.data["sp500_change_percent"].toFixed(2)}%
        </span>
      ) : (
        <span className="red">
          {props.data["sp500_change_percent"].toFixed(2)}%
        </span>
      );
    delta =
      props.data["delta"] >= 0 ? (
        <span className="green">+{props.data["delta"].toFixed(2)}%</span>
      ) : (
        <span className="red">{props.data["delta"].toFixed(2)}%</span>
      );
  }
  return (
    <div className="row">
      <div className="small-3 columns">{date}</div>
      <div className="small-3 columns right">{delta}</div>
      <div className="small-3 columns right">{sp500PercentChange}</div>
      <div className="small-3 columns right">{percentChange}</div>
    </div>
  );
};
