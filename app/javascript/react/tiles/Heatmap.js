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
    dataRow["color"] = pickColor(record["delta"]);

    return dataRow;
  });

  const mobileScroll =
    window.innerWidth < 1024 ? "scrolling-wrapper-mobile" : "";

  const endDate = new Date();
  const startDate = new Date(offsetDate(endDate, -365));

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
                "data-tip": `${value.date_string} - Delta: ${value.delta}`
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

const pickColor = data => {
  let color = 0;
  if (data < 0) {
    if (data > -0.1) {
      color = 10;
    }
    if (data <= -0.1 && data > -0.5) {
      color = 11;
    }
    if (data <= -0.5) {
      color = 12;
    }
  } else if (data === 0) {
    color = 0;
  } else if (data > 0) {
    if (data < 0.1) {
      color = 1;
    }
    if (data >= 0.1 && data < 0.5) {
      color = 2;
    }
    if (data >= 0.5) {
      color = 3;
    }
  }
  return color;
};
