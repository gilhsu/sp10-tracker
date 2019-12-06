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

    const formatTooltip = (
      stockName,
      value,
      changePercent,
      deltaPercent = null
    ) => {
      const displayValue = value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
      const titleColor = stockName === "SP10" ? "#5b85d6" : "#c1300f";
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
          ${data["date"]}
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

    // sp10 tooltip formatting
    // const titleStyle =
    //   "background-color: #5b85d6; color: white; font-size: 14px; padding-top: 5px; padding-bottom: 5px; padding-left: 10px; padding-right: 10px; width: 180px;";
    // const tooltipContainer = "width: 180px; padding: 10px;";
    // const textStyle = "font-size: 14px";
    // const valueColor = data["sp10_value_rounded"] > 10000 ? "green" : "red";
    // const valueStyle = `font-size: 24px; font-weight: bold; color: ${valueColor}`;
    // const changePercentColor =
    //   data["sp10_change_percent"] > 0
    //     ? "font-weight: bold; color: green"
    //     : "font-weight: bold; color: red";
    // const deltaPercentColor =
    //   data["sp10_delta"] > 0
    //     ? "font-weight: bold; color: green"
    //     : "font-weight: bold; color: red";

    // const formatSP10Tooltip = `
    //   <div style="${titleStyle}">
    //     SP10
    //   </div>
    //   <div style="${tooltipContainer}">
    //     <span style="${textStyle}">
    //       ${data["date"]}
    //     </span>
    //     <br/>
    //     <span style="${valueStyle}">
    //       $${data["sp10_value_rounded"]
    //         .toFixed(2)
    //         .replace(/\d(?=(\d{3})+\.)/g, "$&,")}</span>
    //     <br/>
    //     <span style="${textStyle}">
    //       Day Gain/Loss:
    //         <span style="${changePercentColor}">
    //           ${data["sp10_change_percent"].toFixed(2)}%
    //         </span>
    //     </span>
    //     <br/>
    //     <span style="${textStyle}">
    //       Day vs. SP500:
    //         <span style="${deltaPercentColor}">
    //           ${data["sp10_delta"].toFixed(2)}%
    //         </span>
    //     </span>
    //   </div>
    // `;

    const sp10Tooltip = formatTooltip(
      "SP10",
      data["sp10_value"],
      data["sp10_change_percent"],
      data["sp10_delta"]
    );
    dataRow.push(sp10Tooltip);

    dataRow.push(data["sp500_value_rounded"]);

    // sp500 tooltip formatting
    const sp500Tooltip = formatTooltip(
      "S&P 500",
      data["sp500_value"],
      data["sp500_change_percent"]
    );
    dataRow.push(sp500Tooltip);

    return dataRow;
  });

  console.log(data);

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
