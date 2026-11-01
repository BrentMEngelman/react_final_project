import React from "react";

export default function Pagination({
  totalResults,
  currentPage,
  onPageChange,
}) {
  const totalPages = Math.ceil(totalResults / 10);
  const maxPages = Math.min(totalPages, 20);

  if (maxPages <= 1) return null;

  const pages = Array.from({ length: maxPages }, (_, i) => i + 1);

  return (
    <div className="pagination">
      {/* First Page Button */}
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        aria-label="First Page"
      >
        &laquo; First
      </button>

      {/* Previous Page Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous Page"
      >
        &larr; Prev
      </button>

      {/* Page Number Buttons */}
      {pages.map((page) => (
        <button
          key={page}
          className={page === currentPage ? "active" : ""}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      {/* Next Page Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === maxPages}
        aria-label="Next Page"
      >
        Next &rarr;
      </button>

      {/* Last Page Button */}
      <button
        onClick={() => onPageChange(maxPages)}
        disabled={currentPage === maxPages}
        aria-label="Last Page"
      >
        Last &raquo;
      </button>
    </div>
  );
}
