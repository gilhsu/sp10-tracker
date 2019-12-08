import React from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import ReactTooltip from "react-tooltip";

export const Heatmap = ({ records }) => {
  const chronologicalRecords = records && records.reverse();

  // format records for heatmap data needs
  const chartValues = chronologicalRecords.map(record => {
    let dataRow = {};
    dataRow["date"] = offsetDate(record["date_raw"], 1);
    dataRow["date_string"] = record["date"];
    const formatDelta =
      record["delta"] > 0 ? `+${record["delta"]}%` : `${record["delta"]}%`;
    dataRow["delta"] = formatDelta;
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

  const mobileScroll =
    window.innerWidth < 1024 ? "scrolling-wrapper-mobile" : "";

  const startDate = new Date(chartValues[0].date);
  const endDate = new Date(chartValues[chartValues.length - 1].date);

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
            if (value.date_string) {
              return {
                "data-tip": `${value.date_string} - SP10 / S&P 500 Delta: ${value.delta}`
              };
            } else {
              return { "data-tip": "No data available for this day." };
            }
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
