import React, { useState } from "react";
import Modal from "react-modal";
import { ResponsiveModalStyle } from "../components/ResponsiveModalStyle";
import ReactTooltip from "react-tooltip";

export const DailyHistoryRow = props => {
  const [showConstituents, setShowConstituents] = useState(false);

  let date = "N/A";
  let percentChange = "N/A";
  let sp500PercentChange = "N/A";
  let delta = "N/A";
  let constituents = props.data ? props.data.constituents : [];
  let changed_constituents = props.data
    ? props.data.changed_constituents
    : false;

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
    const weight = constituent["weight"]
      ? `${constituent["weight"].toFixed(2)}%`
      : "N/A";

    return (
      <div key={n} className="space-between constituent-row">
        <div className="t2">{`${constituent["position"]}. ${constituent["symbol"]}`}</div>
        <div className="t2">{weight}</div>
      </div>
    );
  });

  return (
    <div className="history-row-container">
      <Modal
        isOpen={showConstituents}
        onRequestClose={() => setShowConstituents(false)}
        style={ResponsiveModalStyle({
          mobileWidthPercent: 80,
          desktopWidthPercent: 35
        })}
        contentLabel="Calc Modal"
        ariaHideApp={false}
      >
        <div className="section-title section-title-no-bottom horizontal-spacer">
          {date}
          <i
            onClick={() => setShowConstituents(false)}
            className="fas fa-times flex-end gray"
          />
        </div>
        <div className="space-between constituent-row">
          <div className="w7 t2">Constituents</div>
          <div className="w7 t2">Weight</div>
        </div>
        {constituentList}
      </Modal>
      <div
        className="row history-row"
        onClick={() => setShowConstituents(true)}
      >
        <div className="small-6 columns">
          {date}
          {changed_constituents && (
            <i
              data-tip="SP10 Constituents Changed"
              className="fas fa-sync-alt change_constituent_icon"
            ></i>
          )}
          <ReactTooltip />
        </div>
        <div className="small-6 history-row-flex">
          <div>{percentChange}</div>
          <div>{sp500PercentChange}</div>
          <div>{delta}</div>
        </div>
      </div>
    </div>
  );
};
