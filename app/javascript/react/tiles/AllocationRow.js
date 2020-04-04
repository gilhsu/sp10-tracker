import React from "react";

export const AllocationRow = ({
  stockIndividualData,
  changeQuantity,
  nameColumnWidth,
  valueColumnWidth
}) => {
  const {
    name,
    full_name,
    price,
    allocation,
    quantity,
    value
  } = stockIndividualData;

  let displayName = window.matchMedia("(max-width: 600px)").matches
    ? name
    : full_name;

  let displayValue = value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
  let displayAllocation = allocation.toFixed(2);
  let displayPrice = price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");

  const handleChange = e => {
    e.preventDefault;
    const validValue = e.target.validity.valid ? e.target.value : 0;
    changeQuantity({
      name: name,
      price: price,
      quantity: validValue
    });
  };

  return (
    <div className="row allocation-row">
      <div className="allocation-text">
        <div className={`${nameColumnWidth} columns allocation-padding`}>
          {displayName}
        </div>
        <span className="small-2 columns text-right allocation-padding">
          ${displayPrice}
        </span>
        <span className="small-3 columns text-right flex-end">
          <input
            className="allocation-input"
            type="number"
            min="0"
            inputMode="numeric"
            pattern="[0-9]*"
            value={quantity}
            onChange={e => handleChange(e)}
          />
        </span>
        <span
          className={`${valueColumnWidth} columns text-right allocation-padding`}
        >
          ${displayValue}
        </span>
        <span className="small-2 columns text-right allocation-padding">
          {displayAllocation}%
        </span>
      </div>
    </div>
  );
};
