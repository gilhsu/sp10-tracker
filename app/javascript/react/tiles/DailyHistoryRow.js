import React, { useState } from "react";
import Modal from "react-modal";
import { ResponsiveModalStyle } from "../components/ResponsiveModalStyle";

export const DailyHistoryRow = props => {
  const [showConstituents, setShowConstituents] = useState(false);

  let date = "N/A";
  let percentChange = "N/A";
  let sp500PercentChange = "N/A";
  let delta = "N/A";
  let constituents = props.data ? props.data.constituents : [];

  if (props.data) {
    date = props.data["date"];
    percentChange =
      props.data["change_percent"] >= 0 ? (
        <span className="green">
          +{props.data["change_percent"].toFixed(2)}%
        </span>
      ) : (
        <span className="red">{props.data["change_percent"].toFixed(2)}%</span>
      );
    sp500PercentChange =
      props.data["sp500_change_percent"] >= 0 ? (
        <span className="green">
          +{props.data["sp500_change_percent"].toFixed(2)}%
        </span>
      ) : (
        <span className="red">
          {props.data["sp500_change_percent"].toFixed(2)}%
        </span>
      );
    delta =
      props.data["delta"] >= 0 ? (
        <span className="green">+{props.data["delta"].toFixed(2)}%</span>
      ) : (
        <span className="red">{props.data["delta"].toFixed(2)}%</span>
      );
  }

  let n = 0;
  const constituentList = constituents.map(constituent => {
    n = n + 1;
    console.log(n);
    return <div>{constituent}</div>;
  });

  return (
    <div className="history-row-container">
      <Modal
        isOpen={showConstituents}
        onRequestClose={() => setShowConstituents(false)}
        style={ResponsiveModalStyle({
          mobileWidthPercent: 95,
          desktopWidthPercent: 70,
          heightPercent: 95,
          transform: 0,
          top: "10px"
        })}
        contentLabel="Calc Modal"
        ariaHideApp={false}
      >
        <div className="section-title horizontal-spacer">
          Constituents
          <i
            onClick={() => setShowConstituents(false)}
            className="fas fa-times flex-end gray"
          />
        </div>
        {constituentList}
      </Modal>
      <div
        className="row history-row"
        onClick={() => setShowConstituents(true)}
      >
        <div className="small-6 columns">{date}</div>
        <div className="small-6 history-row-flex">
          <div>{percentChange}</div>
          <div>{sp500PercentChange}</div>
          <div>{delta}</div>
        </div>
      </div>
    </div>
  );
};
