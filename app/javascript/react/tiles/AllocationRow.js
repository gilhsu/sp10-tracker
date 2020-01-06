import React from "react";

export const AllocationRow = ({ stockIndividualData }) => {
  const { name, full_name, price } = stockIndividualData;

  let displayName = window.matchMedia("(max-width: 600px)").matches
    ? name
    : full_name;

  return (
    <div className="row allocation-row">
      <div className="allocation-text">
        <div className="small-3 columns allocation-padding">{displayName}</div>
        <span className="small-2 columns text-right allocation-padding">
          ${price}
        </span>
        <span className="small-3 columns text-right flex-end">
          <input className="allocation-input" type="number" placeholder="0" />
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
