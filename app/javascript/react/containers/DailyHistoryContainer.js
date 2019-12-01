import React from "react";
import { DailyHistoryRow } from "../tiles/DailyHistoryRow";

export const DailyHistoryContainer = props => {
  let n = 0;
  const dailyHistoryRows =
    props.records &&
    props.records.map(dataRow => {
      n = n + 1;
      return <DailyHistoryRow key={n} data={dataRow} />;
    });

  return (
    <div>
      SP10 Daily Records
      <div className="row">
        <div className="small-3 columns">Date</div>
        <div className="small-3 columns right">Delta</div>
        <div className="small-3 columns right">S&P 500 % Change</div>
        <div className="small-3 columns right">SP10 % Change</div>
      </div>
      {dailyHistoryRows}
    </div>
  );
};
