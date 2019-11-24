import React from "react";

const Ticker = props => {
  let sp10PercentChange = "";
  let sp500PercentChange = "";
  let displayDeltaPercentage = "";
  if (props.sp10["change_percent"]) {
    sp10PercentChange =
      props.sp10["change_percent"] >= 0 ? (
        <span className="green">+{props.sp10["change_percent"]}%</span>
      ) : (
        <span className="red">{props.sp10["change_percent"]}%</span>
      );

    sp500PercentChange =
      props.sp500["change_percent"] >= 0 ? (
        <span className="green">+{props.sp500["change_percent"]}%</span>
      ) : (
        <span className="red">props.sp500["change_percent"]%</span>
      );

    displayDeltaPercentage =
      props.delta >= 0 ? (
        <span className="green">+{props.delta}%</span>
      ) : (
        <span className="red">{props.delta}%</span>
      );
  } else {
    sp10PercentChange = "No Data";
    sp500PercentChange = "No Data";
    displayDeltaPercentage = "No Data";
  }

  return (
    <div className="row">
      <div className="small-4 columns">
        {sp10PercentChange}
        <br />
        SP10
      </div>
      <div className="small-4 columns">
        {sp500PercentChange}
        <br />
        S&P 500
      </div>
      <div className="small-4 columns">
        {displayDeltaPercentage}
        <br />
        Delta
      </div>
    </div>
  );
};

export default Ticker;
