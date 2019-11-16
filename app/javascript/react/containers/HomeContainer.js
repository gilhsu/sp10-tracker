import React, { Component } from "react";
import StocksContainer from "./StocksContainer";
import Chart from "../tiles/Chart";
import Ticker from "../tiles/Ticker";
import DailyHistoryContainer from "./DailyHistoryContainer";

class HomeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div className="row" id="sp10-title">
          SP10
        </div>
        <div className="row">
          <div className="outline small-8 columns">
            <div className="row">
              <div className="outline small-6 columns">
                <Ticker />
              </div>
              <div className="outline small-6 columns">
                <Ticker />
              </div>
            </div>
            <div className="outline row">
              <Chart />
            </div>
          </div>
          <div className="outline small-4 columns">
            <StocksContainer />
          </div>
          <div className="outline">
            <DailyHistoryContainer />
          </div>
        </div>
      </div>
    );
  }
}

export default HomeContainer;
