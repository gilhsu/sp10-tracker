import React from "react";
import { Chart as GoogleChart } from "react-google-charts";

export const ChartFlex = ({ loading, data, changeChartData }) => {
  const chartRangeArray = [
    { name: "1M", length: 20 },
    { name: "3M", length: 62 },
    { name: "6M", length: 125 },
    { name: "1Y", length: 253 }
  ];

  let n = 0;
  const chartOptions = chartRangeArray.map(range => {
    const selected =
      range["length"] === data.length
        ? "selected click-pointer"
        : "click-pointer";

    if (n === 0) {
      n = n + 1;
      return (
        <span
          key={n}
          className={selected}
          onClick={() => changeChartData(range["length"])}
        >
          {range["name"]}
        </span>
      );
    } else {
      n = n + 1;
      return (
        <span key={n}>
          <span>&nbsp; | &nbsp;</span>
          <span
            className={selected}
            onClick={() => changeChartData(range["length"])}
          >
            {range["name"]}
          </span>
        </span>
      );
    }
  });

  const parseData = data.map(data => {
    const formatTooltip = (
      stockName,
      value,
      changePercent,
      deltaPercent = null
    ) => {
      const displayValue = value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
      const titleColor = stockName === "SP10" ? "#2a702a" : "#016d8e";
      const titleStyle = `background-color: ${titleColor}; color: white; font-size: 14px; padding-top: 5px; padding-bottom: 5px; padding-left: 10px; padding-right: 10px; width: 180px;`;
      const tooltipContainer = "width: 180px; padding: 10px;";
      const textStyle = "font-size: 14px";
      const valueColor = value > 10000 ? "green" : "red";
      const valueStyle = `font-size: 24px; font-weight: bold; color: ${valueColor}`;
      const changePercentPlusMinus = changePercent > 0 ? "+" : "";
      const changePercentColor =
        changePercent > 0
          ? "font-weight: bold; color: green"
          : "font-weight: bold; color: red";
      let deltaPercentColor = "";
      let displayDeltaPercent = "";
      if (deltaPercent) {
        if (deltaPercent > 0) {
          deltaPercentColor = "font-weight: bold; color: green";
          displayDeltaPercent = `
            <span style="${textStyle}">
              Day vs. SP500: 
                <span style="${deltaPercentColor}">
                  +${deltaPercent.toFixed(2)}%
                </span>
            </span>
        `;
        } else {
          deltaPercentColor = "font-weight: bold; color: red";
          displayDeltaPercent = `
          <span style="${textStyle}">
            Day vs. SP500: 
              <span style="${deltaPercentColor}">
                ${deltaPercent.toFixed(2)}%
              </span>
          </span>
        `;
        }
      }

      return `
      <div style="${titleStyle}">
        ${stockName}
      </div>
      <div style="${tooltipContainer}">
        <span style="${textStyle}">
          ${data["date_format"]}
        </span>
        <br/>
        <span style="${valueStyle}">
          $${displayValue}
        </span>
        <br/>
        <span style="${textStyle}">
          Day Gain/Loss: 
            <span style="${changePercentColor}">
              ${changePercentPlusMinus}${changePercent.toFixed(2)}%
            </span>
        </span>
        <br/>
        ${displayDeltaPercent}
      </div>`;
    };

    let dataRow = [];
    dataRow.push(data["date"]);
    dataRow.push(data["sp10_value_rounded"]);

    const sp10Tooltip = formatTooltip(
      "SP10",
      data["sp10_value"],
      data["sp10_change_percent"],
      data["sp10_delta"]
    );
    dataRow.push(sp10Tooltip);

    dataRow.push(data["sp500_value_rounded"]);

    const sp500Tooltip = formatTooltip(
      "S&P 500",
      data["sp500_value"],
      data["sp500_change_percent"]
    );
    dataRow.push(sp500Tooltip);

    return dataRow;
  });

  let sp10Value = 0;
  let sp500Value = 0;
  let sp10Delta = 0;
  if (data.length > 0) {
    sp10Value = data[data.length - 1]["sp10_value"];
    sp500Value = data[data.length - 1]["sp500_value"];
    sp10Delta = sp10Value - sp500Value;
  }

  const deltaValue =
    sp10Delta >= 0 ? (
      <span className="chart-number green">
        +${sp10Delta.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}
      </span>
    ) : (
      <span className="chart-number red">
        -${sp10Delta.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}
      </span>
    );

  const displayChartOptions = loading ? "" : chartOptions;

  const content = loading ? (
    <div>
      <div className="loading" style={{ height: "58px" }} />
      <br />
      <div className="loading" style={{ height: "340px" }} />
    </div>
  ) : (
    <div>
      <div className="space-between horizontal-spacer">
        <div className="text-center">
          <span className="chart-number">
            ${sp10Value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}
          </span>
          <br />
          <span className="ticker-name">SP10</span>
        </div>
        <div className="text-center">
          <span className="chart-number">
            ${sp500Value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}
          </span>
          <br />
          <span className="ticker-name">S&P 500</span>
        </div>
        <div className="text-center">
          {deltaValue}
          <br />
          <span className="ticker-name">Delta</span>
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
          legend: "top",
          colors: ["green", "#016d8e"],
          chartArea: { width: "100%", height: "75%" },
          animation: {
            startup: true,
            easing: "linear",
            duration: 1000
          },
          tooltip: { isHtml: true },
          hAxis: {
            baselineColor: "#fff",
            gridlineColor: "#fff",
            textPosition: "none"
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

  return (
    <div className="chart-container">
      <div className="section-title">
        <span className="w7">Growth of 10,000</span>
        <span>{displayChartOptions}</span>
      </div>
      {content}
    </div>
  );
};
