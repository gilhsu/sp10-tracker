import React from "react";

export const AllocationRow = ({
  stockNumber,
  stockIndividualData,
  stockRowsData,
  changeQuantity,
  totalRowsValue
}) => {
  const { name, full_name, price } = stockIndividualData;

  let displayName = window.matchMedia("(max-width: 600px)").matches
    ? name
    : full_name;

  let displayQuantity = 0;
  let displayValue = 0;
  let displayAllocation = 0;
  stockRowsData.forEach(stock => {
    if (stock.stockNumber === stockNumber) {
      displayQuantity = stock.quantity;
      displayValue = stock.value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
      displayAllocation =
        totalRowsValue === 0
          ? "0.00"
          : ((stock.value / totalRowsValue) * 100).toFixed(2);
    }
  });

  const handleChange = e => {
    e.preventDefault;
    const validValue = e.target.validity.valid ? e.target.value : 0;
    changeQuantity({
      stockNumber: stockNumber,
      price: price,
      quantity: validValue
    });
  };

  return (
    <div className="row allocation-row">
      <div className="allocation-text">
        <div className="small-3 columns allocation-padding">{displayName}</div>
        <span className="small-2 columns text-right allocation-padding">
          ${price}
        </span>
        <span className="small-3 columns text-right flex-end">
          <input
            className="allocation-input"
            type="number"
            min="0"
            step="1"
            value={displayQuantity}
            onChange={handleChange}
          />
        </span>
        <span className="small-2 columns text-right allocation-padding">
          ${displayValue}
        </span>
        <span className="small-2 columns text-right allocation-padding">
          {displayAllocation}%
        </span>
      </div>
    </div>
  );
};
