import React from "react";

export default function Pagination({ totalResults, currentPage, onPageChange }) {
  const totalPages = Math.ceil(totalResults / 10);
  const maxPages = Math.min(totalPages, 20);

  if (maxPages <= 1) return null;

  const pages = Array.from({ length: maxPages }, (_, i) => i + 1);

  return (
    <div className="pagination">
      {pages.map((page) => (
        <button
          key={page}
          className={page === currentPage ? "active" : ""}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );
}