function SkeletonCards() {
  return (
    <div className="row g-4" aria-label="Loading article cards">
      {Array.from({ length: 6 }).map((_, index) => (
        <div className="col-12 col-md-6 col-xl-4" key={index}>
          <div className="card news-card skeleton-card h-100">
            <div className="skeleton skeleton-image" />

            <div className="card-body">
              <div className="skeleton skeleton-line short" />
              <div className="skeleton skeleton-line title" />
              <div className="skeleton skeleton-line" />
              <div className="skeleton skeleton-line" />
              <div className="skeleton skeleton-button" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SkeletonCards;
