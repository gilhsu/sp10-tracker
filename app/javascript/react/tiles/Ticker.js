import React from "react";

const Ticker = props => {
  const sp10PercentChange = props.sp10["change-percent"]
    ? `+${props.sp10["change-percent"]}%`
    : props.sp10["change-percent"];

  const sp500PercentChange = props.sp500["change-percent"]
    ? `+${props.sp500["change-percent"]}%`
    : props.sp500["change-percent"];

  const sp10DisplayPercent = props.sp10["symbol"]
    ? sp10PercentChange
    : "no data yet";

  const deltaPercentage =
    props.sp10["change-percent"] - props.sp500["change-percent"];

  const displayDeltaPercentage =
    deltaPercentage > 0 ? `+${deltaPercentage}%` : deltaPercentage;

  return (
    <div className="row">
      <div className="small-4 columns">
        {sp10DisplayPercent}
        <br />
        SP10
      </div>
      <div className="small-4 columns">
        {sp500PercentChange}
        <br />
        SP500
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
