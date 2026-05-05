function Pagination({ page, totalPages, loading, onPageChange }) {
  return (
    <div className="pagination-bar">
      <button
        className="btn btn-outline-primary"
        type="button"
        disabled={page <= 1 || loading}
        onClick={() => onPageChange(page - 1)}
      >
        Previous
      </button>

      <span className="page-indicator">
        Page {page} of {totalPages}
      </span>

      <button
        className="btn btn-outline-primary"
        type="button"
        disabled={page >= totalPages || loading}
        onClick={() => onPageChange(page + 1)}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
