function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="pagination-container">

      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>

      <button
        onClick={() => onPageChange(totalPages)}
      >
        Last Page
      </button>

    </div>
  );
}

export default Pagination;