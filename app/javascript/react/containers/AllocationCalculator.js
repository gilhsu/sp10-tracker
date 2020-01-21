import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { AllocationRow } from "../tiles/AllocationRow";
import { ResponsiveModalStyle } from "../components/ResponsiveModalStyle";

export const AllocationCalculator = ({ stockData }) => {
  const [calcModalIsOpen, setCalcModalIsOpen] = useState(false);
  const [formValue, setFormValue] = useState(0);
  const [stockRowsData, setStockRowsData] = useState([]);
  const [totalRowsValue, setTotalRowsValue] = useState(0);

  // set stockRows Data on pageMount
  useEffect(() => {
    let key = 0;
    const tempStockRowsData = stockData.map(stockIndividualData => {
      key = key + 1;
      return {
        stockNumber: key,
        name: stockIndividualData.name,
        full_name: stockIndividualData.full_name,
        price: stockIndividualData.price,
        quantity: 0,
        value: 0,
        allocation: 0
      };
    });
    setStockRowsData(tempStockRowsData);
  }, []);

  // when stockRowsData updates, update the TotalRowsValue data
  useEffect(() => {
    let tempTotalRowsValue = 0;
    stockRowsData.forEach(stock => {
      tempTotalRowsValue = tempTotalRowsValue + stock.value;
    });
    setTotalRowsValue(tempTotalRowsValue);
  }, [stockRowsData]);

  // general method for changing stock quantities in calculator
  const changeQuantity = ({ stockNumber, price, quantity }) => {
    let tempStockRowData = stockRowsData.map(stock => {
      if (stock.stockNumber === stockNumber) {
        stock.quantity = quantity;
        stock.value = +quantity * price;
        return stock;
      } else {
        return stock;
      }
    });
    let totalStocksValue = 0;
    tempStockRowData.forEach(stock => {
      totalStocksValue = totalStocksValue + stock.value;
    });
    tempStockRowData = tempStockRowData.map(stock => {
      stock.allocation = (stock.value / totalStocksValue) * 100;
      return stock;
    });
    setStockRowsData(tempStockRowData);
  };

  // equal allocation quick calc logic
  const handleEqualSplit = () => {
    let sortedStocks = stockRowsData.concat().sort((a, b) => {
      return b.price - a.price;
    });

    sortedStocks.forEach(stock => {
      const largestStockPrice = sortedStocks[0].price;
      const stockQuantity = Math.round(largestStockPrice / stock.price);
      changeQuantity({
        stockNumber: stock.stockNumber,
        price: stock.price,
        quantity: stockQuantity
      });
    });
  };

  // clear form values
  const handleClear = () => {
    let tempStockRowsData = stockRowsData.map(stock => {
      stock.quantity = 0;
      stock.value = 0;
      stock.allocation = 0;
      return stock;
    });
    setStockRowsData(tempStockRowsData);
  };

  let totalStockValue = 0;
  stockRowsData.forEach(stock => {
    totalStockValue = totalStockValue + stock.value;
  });

  const displayTotalStockValue =
    totalStockValue === 0
      ? "0.00"
      : totalStockValue.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");

  let cashRemainderValue = 0;
  const displayTotalStockAllocation =
    totalStockValue === 0
      ? "0.00%"
      : `${(
          ((totalStockValue - cashRemainderValue) / totalStockValue) *
          100
        ).toFixed(2)}%`;

  const allocationRows = stockRowsData.map(stockIndividualData => {
    return (
      <AllocationRow
        key={stockIndividualData.stockNumber}
        stockIndividualData={stockIndividualData}
        changeQuantity={changeQuantity}
      />
    );
  });

  return (
    <div>
      <a onClick={() => setCalcModalIsOpen(true)}>Allocation Calculator</a>
      <Modal
        isOpen={calcModalIsOpen}
        onRequestClose={() => setCalcModalIsOpen(false)}
        style={ResponsiveModalStyle({
          mobileWidthPercent: 95,
          desktopWidthPercent: 70,
          heightPercent: 95
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
        <div className="row allocation-intro">
          <div className="small-12 large-6 columns padding-right">
            <div className="small-12 columns horizontal-spacer ">
              The minimum total value necessary for equal allocation of stocks
              given current stock prices.
            </div>
            <div
              className="button allocation-button"
              onClick={handleEqualSplit}
            >
              Calculate
            </div>
          </div>
          <div className="small-12 large-6 columns">
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
        <div className="row section-title-no-flex allocation-text">
          <span className="small-3 columns w7">Stock</span>
          <span className="w7 small-2 columns text-right">Price</span>
          <span className="w7 small-3 columns text-right">Quantity</span>
          <span className="w7 small-2 columns text-right">Value</span>
          <span className="w7 small-2 columns text-right">Alloc.</span>
        </div>
        {allocationRows}
        <div className="row allocation-text">
          <div className="small-12">
            <div className="row allocation-totals">
              <span className="small-8 columns text-right w7">
                Cash Remainder
              </span>
              <span className="small-2 columns text-right">$0.00</span>
              <span className="small-2 columns text-right">0.00%</span>
            </div>
          </div>
          <div className="small-12">
            <div className="row allocation-row">
              <span className="small-8 columns text-right w7">
                Total Stock Value
              </span>
              <span className="small-2 columns text-right">
                ${displayTotalStockValue}
              </span>
              <span className="small-2 columns text-right">
                {displayTotalStockAllocation}
              </span>
            </div>
          </div>
          <div className="row text-right">
            <div className="small-12 columns" style={{ marginTop: "1.25rem" }}>
              <div className="button allocation-button" onClick={handleClear}>
                Clear
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
