import React, { Component } from "react";
import DailyHistoryRow from "../tiles/DailyHistoryRow";

class DailyHistoryContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        Hello from DailyHistoryContainer
        <DailyHistoryRow />
        <DailyHistoryRow />
        <DailyHistoryRow />
        <DailyHistoryRow />
        <DailyHistoryRow />
      </div>
    );
  }
}

export default DailyHistoryContainer;
