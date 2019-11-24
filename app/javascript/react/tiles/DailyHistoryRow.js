import React from "react";

const DailyHistoryRow = props => {
  const date = props.data ? props.data["date"] : "N/A";
  const percentChange = props.data ? `${props.data["change_percent"]}%` : "N/A";
  const sp500PercentChange = props.data
    ? `${props.data["sp500_change_percent"]}%`
    : "N/A";
  const delta = props.data ? `${props.data["delta"]}%` : "N/A";
  return (
    <div className="row">
      <div className="small-3 columns">{date}</div>
      <div className="small-3 columns right">{delta}</div>
      <div className="small-3 columns right">{sp500PercentChange}</div>
      <div className="small-3 columns right">{percentChange}</div>
    </div>
  );
};

export default DailyHistoryRow;
