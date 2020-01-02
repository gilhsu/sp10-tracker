import React, { useState } from "react";
import Modal from "react-modal";
import { ResponsiveModalStyle } from "../components/ResponsiveModalStyle";

export const AllocationCalculator = () => {
  const [calcModalIsOpen, setCalcModalIsOpen] = useState(false);
  const [formValue, setFormValue] = useState(0);

  return (
    <div>
      <a onClick={() => setCalcModalIsOpen(true)}>Allocation Calculator</a>
      <Modal
        isOpen={calcModalIsOpen}
        onRequestClose={() => setCalcModalIsOpen(false)}
        style={ResponsiveModalStyle()}
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
            <form>
              <div className="row collapse">
                <div className="small-8 columns">
                  <input
                    type="number"
                    onChange={e => setFormValue(e.target.value)}
                    placeholder="Enter Dollar Amount"
                    required
                    value={formValue}
                  />
                </div>
                <div className="small-4 columns">
                  <a
                    href=""
                    className="button postfix"
                    onClick={() => calcValue(formValue)}
                  >
                    Calculate
                  </a>
                </div>
              </div>
            </form>
          </div>
          <div className="small-12 large-6 columns container">Content</div>
        </div>
      </Modal>
    </div>
  );
};
