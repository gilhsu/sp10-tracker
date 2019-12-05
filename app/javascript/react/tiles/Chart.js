import React from "react";
import { Chart as GoogleChart } from "react-google-charts";

export const Chart = ({ data, changeChartData }) => {
  const chartRangeArray = [30, 90, 180, 253];
  const chartOptions = chartRangeArray.map(range => {
    const current = range === data.length ? "current" : "";
    return (
      <li key={range} className={current}>
        <a onClick={() => changeChartData(range)}>{range}</a>
      </li>
    );
  });

  const sp10Delta =
    data.length > 0
      ? (data[data.length - 1][1] - data[data.length - 1][2]).toFixed(2)
      : 0;

  return (
    <div>
      <div className="row">
        <div className="small-6 columns">
          Growth of 10,000
          <br />
          Gain/Loss vs. S&P 500: ${sp10Delta}
        </div>
        <div className="small-6 columns pagination-centered">
          <ul className="pagination">
            <li>Range:</li>
            {chartOptions}
          </ul>
        </div>
      </div>
      <GoogleChart
        width={"100%"}
        height={"400px"}
        chartType="AreaChart"
        loader={<div>Loading Chart</div>}
        data={[["x", "SP10", "SP500"], ...data]}
        options={{
          chartArea: { width: "60%" },
          animation: {
            startup: true,
            easing: "linear",
            duration: 1000
          }
        }}
        chartEvents={[
          {
            eventName: "animationfinish",
            callback: () => {
              console.log("Animation Finished");
            }
          }
        ]}
      />
    </div>
  );
};
