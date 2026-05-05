function LoadingSpinner() {
  return (
    <div className="loading-state" role="status">
      <div className="spinner-border text-primary" aria-hidden="true" />
      <span className="visually-hidden">Loading news...</span>
      <p className="mt-3 mb-0">Fetching the latest headlines...</p>
    </div>
  );
}

export default LoadingSpinner;
