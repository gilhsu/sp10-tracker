import React, { Component } from "react";
import DailyHistoryRow from "../tiles/DailyHistoryRow";

class DailyHistoryContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let n = 0;
    const dailyHistoryRows = this.props.sp10_daily_history.map(dataRow => {
      n = n + 1;
      return <DailyHistoryRow key={n} data={dataRow} />;
    });

    return (
      <div>
        <div className="row">
          <div className="small-3 columns">Date</div>
          <div className="small-3 columns right">Delta</div>
          <div className="small-3 columns right">S&P 500 % Change</div>
          <div className="small-3 columns right">SP10 % Change</div>
        </div>
        {dailyHistoryRows}
      </div>
    );
  }
}

export default DailyHistoryContainer;
