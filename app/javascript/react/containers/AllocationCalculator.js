import React, { useState } from "react";
import Modal from "react-modal";
import { AllocationRow } from "../tiles/AllocationRow";
import { ResponsiveModalStyle } from "../components/ResponsiveModalStyle";

export const AllocationCalculator = ({ stockData }) => {
  const [calcModalIsOpen, setCalcModalIsOpen] = useState(false);
  const [formValue, setFormValue] = useState(0);

  let n = 0;
  const allocationRows = stockData.map(stockIndividualData => {
    n = n + 1;
    return <AllocationRow key={n} stockIndividualData={stockIndividualData} />;
  });

  return (
    <div>
      <a onClick={() => setCalcModalIsOpen(true)}>Allocation Calculator</a>
      <Modal
        isOpen={calcModalIsOpen}
        onRequestClose={() => setCalcModalIsOpen(false)}
        style={ResponsiveModalStyle({
          mobileWidthPercent: 95,
          desktopWidthPercent: 70
        })}
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
          <div className="small-12 large-6 columns padding-right">
            <div className="small-12 columns horizontal-spacer ">
              The minimum total value necessary for equal allocation of stocks
              given current stock prices.
            </div>
            <div className="button allocation-button">Calculate</div>
          </div>
          <div className="small-12 large-6 columns padding-right">
            <div className="small-12 columns horizontal-spacer">
              Calculate the equal allocation of stocks given a custom value and
              current stock prices.
            </div>
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
        </div>
        <div className="row section-title-no-flex">
          <span className="small-4 columns w7">Stock</span>
          <span className="w7 small-2 columns text-right">Price</span>
          <span className="w7 small-2 columns text-right">Quantity</span>
          <span className="w7 small-2 columns text-right">Value</span>
          <span className="w7 small-2 columns text-right">Allocation</span>
        </div>
        {allocationRows}
        <div className="row t2 stock-row">
          <div className="small-12">
            <div className="row">
              <span className="small-8 columns text-right w7">
                Cash Remainder
              </span>
              <span className="small-2 columns text-right">$0.00</span>
              <span className="small-2 columns text-right">0.00%</span>
            </div>
          </div>
          <div className="small-12">
            <div className="row">
              <span className="small-8 columns text-right w7">
                Total Stock Value
              </span>
              <span className="small-2 columns text-right">$0.00</span>
              <span className="small-2 columns text-right">0.00%</span>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
