import React from "react";
import { Chart as GoogleChart } from "react-google-charts";

export const Chart = ({ data, changeChartData }) => {
  const chartRangeArray = [
    { name: "1M", length: 20 },
    { name: "3M", length: 62 },
    { name: "6M", length: 125 },
    { name: "1Y", length: 253 }
  ];
  const n = 0;
  const chartOptions = chartRangeArray.map(range => {
    const current = range["length"] === data.length ? "current" : "";
    return (
      <li key={range["length"]} className={current}>
        <a onClick={() => changeChartData(range["length"])}>{range["name"]}</a>
      </li>
    );
  });

  const parseData = data.map(data => {
    let dataRow = [];
    dataRow.push(data["date"]);
    dataRow.push(data["sp10_value_rounded"]);
    const tooltipContainer = "width: 180px; padding: 10px;";
    const textStyle = "font-size: 14px";
    const valueColor = data["sp10_value_rounded"] > 10000 ? "green" : "red";
    const valueStyle = `font-size: 24px; font-weight: bold; color: ${valueColor}`;
    const changePercentColor =
      data["sp10_change_percent"] > 0
        ? "font-weight: bold; color: green"
        : "font-weight: bold; color: red";
    const deltaPercentColor =
      data["sp10_delta"] > 0
        ? "font-weight: bold; color: green"
        : "font-weight: bold; color: red";

    const formatSP10Tooltip = `
      <div style="background-color: #537fd4; color: white; font-size: 14px; padding-top: 5px; padding-bottom: 5px; padding-left: 10px; padding-right: 10px; width: 180px;">
        SP10
      </div>
      <div style="${tooltipContainer}">
        <span style="${textStyle}">
          ${data["date"]}
        </span>
        <br/>
        <span style="${valueStyle}">
          $${data["sp10_value_rounded"].toFixed(2).toLocaleString()}</span>
        <br/>
        <span style="${textStyle}">
          Day Gain/Loss: 
            <span style="${changePercentColor}">
              ${data["sp10_change_percent"].toFixed(2)}%
            </span>
        </span>
        <br/>
        <span style="${textStyle}">
          Day vs. SP500: 
            <span style="${deltaPercentColor}">
              ${data["sp10_delta"].toFixed(2)}%
            </span>
        </span>
      </div>
    `;
    dataRow.push(formatSP10Tooltip);

    dataRow.push(data["sp500_value_rounded"]);

    const sp500Style = "width: 100px; height: 100px; color: red;";

    const formatSP500Tooltip = `
      <div style="${tooltipContainer}">
        Label Value ${data["sp500_value_rounded"]}
      </div>
    `;
    dataRow.push(formatSP500Tooltip);

    return dataRow;
  });

  console.log(parseData);

  const sp10Delta =
    data.length > 0
      ? (data[data.length - 1][1] - data[data.length - 1][3]).toFixed(2)
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
        data={[
          [
            "x",
            "SP10",
            { role: "tooltip", type: "string", p: { html: true } },
            "SP500",
            { role: "tooltip", type: "string", p: { html: true } }
          ],
          ...parseData
        ]}
        options={{
          chartArea: { width: "60%" },
          animation: {
            startup: true,
            easing: "linear",
            duration: 1000
          },
          tooltip: { isHtml: true }
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
