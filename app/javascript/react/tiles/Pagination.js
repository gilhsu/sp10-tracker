import React from "react";

export const Pagination = ({
  currentPage,
  setCurrentPage,
  recordsPerPage,
  totalRecords
}) => {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalRecords / recordsPerPage);

  // logic to get pageNumber index. Always displays 5 pages.
  let firstPageIndex = currentPage - 2;
  if (currentPage < 4) {
    firstPageIndex = 1;
  } else if (currentPage > 11) {
    firstPageIndex = 9;
  }

  let lastPageIndex = currentPage + 2;
  if (currentPage < 4) {
    lastPageIndex = 5;
  } else if (currentPage > 11) {
    lastPageIndex = 13;
  }

  for (let i = firstPageIndex; i <= lastPageIndex; i++) {
    pageNumbers.push(i);
  }

  const enableLeftArrow = currentPage !== 1 ? "arrow" : "arrow unavailable";
  const enableRightArrow =
    currentPage !== totalPages ? "arrow" : "arrow unavailable";

  return (
    <div className="pagination-centered">
      <ul className="pagination">
        <li className={enableLeftArrow}>
          <a onClick={() => setCurrentPage(currentPage - 1)}>&laquo; PREV</a>
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
          <a onClick={() => setCurrentPage(currentPage + 1)}>NEXT &raquo;</a>
        </li>
      </ul>
    </div>
  );
};
