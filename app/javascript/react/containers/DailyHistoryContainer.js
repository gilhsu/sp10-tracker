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
      <div className="section-title section-title-no-bottom">
        SP10 Daily Records
      </div>
      <div className="row history-row">
        <div className="small-5 columns w5">Date</div>
        <div className="small-7 space-around">
          <div className="w5">SP10</div>
          <div className="w5">S&P 500</div>
          <div className="w5">Delta</div>
        </div>
      </div>
      {dailyHistoryRows}
    </div>
  );
};
