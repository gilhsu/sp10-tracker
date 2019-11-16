import React, { Component } from "react";
import StocksContainer from "./StocksContainer";

class HomeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        SP10 Tracker
        <StocksContainer />
      </div>
    );
  }
}

export default HomeContainer;
