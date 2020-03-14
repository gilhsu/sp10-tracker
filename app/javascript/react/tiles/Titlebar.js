import React, { useState } from "react";
import Modal from "react-modal";
import { AllocationCalculator } from "../containers/AllocationCalculator";
import { ResponsiveModalStyle } from "../components/ResponsiveModalStyle";

export const Titlebar = ({ sp10, stockData }) => {
  const [thesisModalIsOpen, setThesisModalIsOpen] = useState(false);
  const { weight: sp10Weight } = sp10;

  return (
    <div className="row container">
      <div className="small-12 columns w7" id="sp10-title">
        SP10
      </div>
      <div className="small-12 columns" id="sp10-subtitle">
        <div>
          Top 10 S&P 500 Stock Tracker{" "}
          <a onClick={() => setThesisModalIsOpen(true)}>
            <i className="fas fa-info-circle"></i>
          </a>
          <Modal
            isOpen={thesisModalIsOpen}
            onRequestClose={() => setThesisModalIsOpen(false)}
            style={ResponsiveModalStyle({
              mobileWidthPercent: 95,
              desktopWidthPercent: 50
            })}
            contentLabel="Thesis Modal"
            ariaHideApp={false}
          >
            <div className="section-title horizontal-spacer">
              SP10 Fund Thesis
              <i
                onClick={() => setThesisModalIsOpen(false)}
                className="fas fa-times flex-end gray"
              ></i>
            </div>
            <div className="horizontal-paragraph-spacer">
              The SP10 tracks the average return of the top 10 stock
              constituents of the S&P 500. These 10 stocks disproportionately
              combine to represent {sp10Weight.toFixed(2)}% of the US market
              index.
            </div>
            <div>
              Therefore, if you believe that the US market will grow in the
              long-term, the highest-weighted stocks will be disproportionately
              responsible for this growth.
            </div>
          </Modal>
        </div>
        <AllocationCalculator stockData={stockData} />
      </div>
    </div>
  );
};
