import React from "react";
import { Chart as GoogleChart } from "react-google-charts";

export const Chart = props => {
  return (
    <div>
      <div>Growth of 10,000</div>
      <GoogleChart
        width="100%"
        height={400}
        chartType="Line"
        loader={<div>Loading Chart</div>}
        data={[
          ["x", "SP10", "SP500"],
          ["12/1/2019", 0, 14],
          ["12/2/2019", 10, 20],
          ["12/1/2019", 23, 20],
          ["12/1/2019", 17, 23],
          ["12/1/2019", 18, 20],
          ["12/1/2019", 9, 20],
          ["12/1/2019", 11, 56],
          ["12/1/2019", 27, 20],
          ["12/1/2019", 33, 32],
          ["12/1/2019", 40, 20],
          ["12/1/2019", 32, 20],
          ["12/1/2019", 35, 20]
        ]}
        options={{
          chartArea: { width: "100%" },
          hAxis: {
            title: "Dates",
            minValue: 0
          },
          vAxis: {
            title: "City"
          },
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
