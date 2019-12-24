import React, { useState } from "react";
import Modal from "react-modal";

export const Titlebar = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "75%",
      padding: "35px"
    },
    overlay: {
      background: "rgba(0, 0, 0, 0.5)"
    }
  };

  return (
    <div className="row container">
      <div className="small-12 columns w7" id="sp10-title">
        SP10
      </div>
      <div className="small-12 columns" id="sp10-subtitle">
        <div>
          Top 10 S&P 500 Stock Tracker{" "}
          <a onClick={openModal}>
            <i className="fas fa-info-circle"></i>
          </a>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
            ariaHideApp={false}
          >
            <div className="section-title horizontal-spacer">
              SP10 Fund Thesis
            </div>
            <div className="horizontal-paragraph-spacer">
              The SP10 tracks the average return of the top 10 stock
              constituents of the S&P 500. These 10 stocks disproportionately
              combine to represent ~22.5% of the US market index.
            </div>
            <div className="horizontal-spacer">
              Therefore, if you believe that the US market will grow in the
              long-term, the highest-weighted stocks will be disproportionately
              responsible for this growth.
            </div>
          </Modal>
        </div>
        <a>Funds Calculator</a>
      </div>
    </div>
  );
};
