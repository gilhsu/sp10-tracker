import React, { useState } from "react";
import Modal from "react-modal";

export const Titlebar = () => {
  const [thesisModalIsOpen, setThesisModalIsOpen] = useState(false);
  const [calcModalIsOpen, setCalcModalIsOpen] = useState(false);

  let modalStyle = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "50%",
      padding: "50px"
    },
    overlay: {
      background: "rgba(0, 0, 0, 0.5)"
    }
  };

  const mobileFormat = x => {
    if (x.matches) {
      modalStyle = {
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          width: "75%",
          padding: "20px"
        },
        overlay: {
          background: "rgba(0, 0, 0, 0.5)"
        }
      };
    }
  };

  const x = window.matchMedia("(max-width: 600px)");
  mobileFormat(x); // Call listener function at run time
  x.addListener(mobileFormat); // Attach listener function on state changes

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
            style={modalStyle}
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
        <a onClick={() => setCalcModalIsOpen(true)}>Allocation Calculator</a>
        <Modal
          isOpen={calcModalIsOpen}
          onRequestClose={() => setCalcModalIsOpen(false)}
          style={modalStyle}
          contentLabel="Calc Modal"
          ariaHideApp={false}
        >
          <div className="section-title horizontal-spacer">
            Allocation Calculator
            <i
              onClick={() => setCalcModalIsOpen(false)}
              className="fas fa-times flex-end gray"
            ></i>
          </div>
          <div className="row">
            <div className="small-12 large-6 columns">
              <div className="row collapse">
                <div className="small-8 columns">
                  <input type="text" placeholder="Enter Dollar Amount" />
                </div>
                <div className="small-4 columns">
                  <a href="#" className="button postfix">
                    Calculate
                  </a>
                </div>
              </div>
            </div>
            <div className="small-12 large-6 columns container">Content</div>
          </div>
        </Modal>
      </div>
    </div>
  );
};
