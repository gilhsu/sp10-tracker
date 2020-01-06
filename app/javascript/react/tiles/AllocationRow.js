import React, { useState } from "react";

export const AllocationRow = ({
  stockNumber,
  stockIndividualData,
  stockQuantities,
  changeQuantity
}) => {
  const { name, full_name, price } = stockIndividualData;
  const [stockQuantity, setStockQuantity] = useState(0);

  let displayName = window.matchMedia("(max-width: 600px)").matches
    ? name
    : full_name;

  let displayQuantity = 10;
  stockQuantities.forEach(stock => {
    if (stock.stockNumber === stockNumber) {
      displayQuantity = stock.quantity;
    }
  });

  const handleChange = e => {
    e.preventDefault;
    changeQuantity(stockNumber, e.target.value);
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
            value={displayQuantity}
            onChange={handleChange}
          />
        </span>
        <span className="small-2 columns text-right allocation-padding">
          $2000.00
        </span>
        <span className="small-2 columns text-right allocation-padding">
          90.00%
        </span>
      </div>
    </div>
  );
};
