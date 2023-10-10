// Pagination.tsx

import React from 'react';
import { useRouter } from 'next/router';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}


const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const router = useRouter();
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="pagination-container">
      <button
        onClick={() => { router.push('#discover', '',{ shallow: true}); onPageChange(currentPage - 1)}} // Mover la camara a el searchbar
        disabled={currentPage === 1}
        className="pagination-button"
        
      >
        Anterior
      </button>
      <div className="page-numbers">
        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => { router.push('#discover', '',{ shallow: true}); onPageChange(pageNumber)}}
            className={`page-number ${currentPage === pageNumber ? 'active' : ''}`}
          >
            {pageNumber}
          </button>
        ))}
      </div>
      <button
        onClick={() => { router.push('#discover', '',{ shallow: true}); onPageChange(currentPage + 1)}}
        disabled={currentPage === totalPages}
        className="pagination-button"
      >
        Siguiente
      </button>
    </div>
  );
};

export default Pagination;
