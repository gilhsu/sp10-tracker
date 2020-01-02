import React from "react";

export const AllocationRow = ({ stockIndividualData }) => {
  const { name, price } = stockIndividualData;
  return (
    <div className="row">
      <div className="t2">
        <div className="small-4 columns">{name}</div>
        <span className="small-2 columns text-right">${price}</span>
        <span className="small-2 columns text-right flex-end">
          <input className="allocation-input" type="number" placeholder="0" />
        </span>
        <span className="small-2 columns text-right">$200.00</span>
        <span className="small-2 columns text-right">0.00%</span>
      </div>
    </div>
  );
};
