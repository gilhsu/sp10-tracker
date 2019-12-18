import React from "react";
import { DailyHistoryRow } from "../tiles/DailyHistoryRow";

export const DailyHistoryContainer = ({ records }) => {
  let n = 0;
  const dailyHistoryRows = records.map(dataRow => {
    n = n + 1;
    return <DailyHistoryRow key={n} data={dataRow} />;
  });

  return (
    <div className="padding-10">
      <div className="w7">SP10 Daily Records</div>
      <div className="row">
        <div className="small-3 columns">Date</div>
        <div className="small-3 columns text-right">S&P 500 % Change</div>
        <div className="small-3 columns text-right">SP10 % Change</div>
        <div className="small-3 columns text-right">Delta</div>
      </div>
      {dailyHistoryRows}
    </div>
  );
};
