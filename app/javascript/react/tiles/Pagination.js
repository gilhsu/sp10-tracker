import React from "react";

export const Pagination = ({
  currentPage,
  setCurrentPage,
  recordsPerPage,
  totalRecords
}) => {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalRecords / recordsPerPage);
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const enableLeftArrow = currentPage !== 1 ? "arrow" : "arrow unavailable";
  const enableRightArrow =
    currentPage !== totalPages ? "arrow" : "arrow unavailable";

  return (
    <div className="pagination-centered">
      <ul className="pagination">
        <li className={enableLeftArrow}>
          <a onClick={() => setCurrentPage(currentPage - 1)}>&laquo;</a>
        </li>

        {pageNumbers.map(number => {
          const current = number === currentPage ? "current" : "";
          return (
            <li className={current} key={number}>
              <a onClick={() => setCurrentPage(number)}>{number}</a>
            </li>
          );
        })}

        <li className={enableRightArrow}>
          <a onClick={() => setCurrentPage(currentPage + 1)}>&raquo;</a>
        </li>
      </ul>
    </div>
  );
};
