import React from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import ReactTooltip from "react-tooltip";

export const Heatmap = ({ records }) => {
  const chronologicalRecords = records && records.reverse();

  console.log(records);

  const chartValues = chronologicalRecords.map(record => {
    let dataRow = {};
    dataRow["date"] = offsetDate(record["date_raw"], 1);
    dataRow["date_string"] = record["date"];
    dataRow["delta"] = record["delta"];
    let color = 8;

    if (record["delta"] < 0) {
      if (record["delta"] > -0.1) {
        color = 10;
      }
      if (record["delta"] <= -0.1 && record["delta"] > -0.5) {
        color = 11;
      }
      if (record["delta"] <= -0.5) {
        color = 12;
      }
    } else if (record["delta"] === 0) {
      color = 0;
    } else if (record["delta"] > 0) {
      if (record["delta"] < 0.1) {
        color = 1;
      }
      if (record["delta"] >= 0.1 && record["delta"] < 0.5) {
        color = 2;
      }
      if (record["delta"] >= 0.5) {
        color = 3;
      }
    }
    dataRow["color"] = color;
    return dataRow;
  });

  const windowSize = window.addEventListener("resize", function() {
    return window.innerWidth;
  });

  console.log(window.innerWidth);

  const startDate = new Date(chartValues[0].date);
  const endDate = new Date(chartValues[chartValues.length - 1].date);

  const mobileScroll =
    window.innerWidth < 1024 ? "scrolling-wrapper-mobile" : "";

  return (
    <div>
      <div className="w7">SP10 / S&P 500 Delta Heatmap </div>
      <div className={mobileScroll}>
        <CalendarHeatmap
          startDate={startDate}
          endDate={endDate}
          showWeekdayLabels={true}
          classForValue={value => {
            if (!value) {
              return "color-empty";
            }
            return `color-sp10-${value.color}`;
          }}
          values={chartValues}
          tooltipDataAttrs={value => {
            return {
              "data-tip": `${value.date_string} has count: ${value.delta}`
            };
          }}
        />
        <ReactTooltip />
      </div>
    </div>
  );
};

const offsetDate = (date, offset) => {
  let tempDate = new Date(date);
  return tempDate.setDate(tempDate.getDate() + offset);
};
