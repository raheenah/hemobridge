import React from 'react';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const getPageNumbers = () => {
    const pageNumbers = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 3; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = totalPages - 2; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1);
        pageNumbers.push('...');
        pageNumbers.push(currentPage);
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    }
    return pageNumbers;
  };

  return (
    <div className='flex justify-end items-center my-4 gap-2'>
      <button
        className='px-2 py-1 hover:bg-light-pink disabled:opacity-50'
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
      >
        <i className='fa-solid fa-angle-left'></i>
      </button>

      {getPageNumbers().map((page, index) => (
        <button
          key={index}
          className={`px-2 py-1 hover:bg-light-pink ${
            currentPage === page ? "bg-light-pink" : ""
          }`}
          onClick={() => typeof page === "number" && onPageChange(page)}
          disabled={page === "..."}
        >
          {page}
        </button>
      ))}

      <button
        className='px-2 py-1 hover:bg-light-pink disabled:opacity-50'
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
      >
        <i className='fa-solid fa-angle-right'></i>
      </button>
    </div>
  );
}
