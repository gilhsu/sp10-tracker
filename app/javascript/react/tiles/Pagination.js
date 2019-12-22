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

  const prevButton =
    currentPage === 1 ? (
      <span className="history-page-button-disabled">prev</span>
    ) : (
      <span
        className="history-page-button"
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        prev
      </span>
    );

  const nextButton =
    currentPage === totalPages ? (
      <span className="history-page-button-disabled">next</span>
    ) : (
      <span
        className="history-page-button"
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        next
      </span>
    );

  return (
    <div className="flex-center">
      {prevButton}
      <span className="history-page-number w7">{currentPage}</span>
      <span className="history-page-number w7">/</span>
      <span className="history-page-number w7">{totalPages}</span>
      {nextButton}
    </div>
  );
};
