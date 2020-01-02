import React, { useState } from "react";
import Modal from "react-modal";
import { AllocationCalculator } from "./AllocationCalculator";
import { ResponsiveModalStyle } from "../components/ResponsiveModalStyle";

export const Titlebar = () => {
  const [thesisModalIsOpen, setThesisModalIsOpen] = useState(false);

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
            style={ResponsiveModalStyle()}
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
              combine to represent ~22.5% of the US market index.
            </div>
            <div>
              Therefore, if you believe that the US market will grow in the
              long-term, the highest-weighted stocks will be disproportionately
              responsible for this growth.
            </div>
          </Modal>
        </div>
        <AllocationCalculator />
      </div>
    </div>
  );
};
