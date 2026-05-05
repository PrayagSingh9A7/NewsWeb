import { Link } from "react-router-dom";
import NewsCard from "../components/NewsCard.jsx";

function SavedPage({
  savedArticles,
  isSaved,
  onToggleBookmark,
  onClearBookmarks,
}) {
  return (
    <section className="news-page">
      <div className="page-header">
        <div>
          <p className="section-kicker">Personal reading list</p>
          <h1>Saved Articles</h1>
          <p className="text-muted mb-0">
            Articles you bookmark are stored in your browser for quick access.
          </p>
        </div>

        <div className="d-flex gap-2 flex-wrap">
          <div className="results-pill">{savedArticles.length} saved</div>

          {savedArticles.length > 0 && (
            <button
              className="btn btn-outline-danger"
              type="button"
              onClick={onClearBookmarks}
            >
              Clear All
            </button>
          )}
        </div>
      </div>

      {savedArticles.length === 0 ? (
        <div className="empty-state">
          <h2 className="h4">No saved articles yet</h2>
          <p className="text-muted">
            Save stories from any news card and they will appear here.
          </p>
          <Link className="btn btn-primary" to="/">
            Browse News
          </Link>
        </div>
      ) : (
        <div className="row g-4">
          {savedArticles.map((article) => (
            <div className="col-12 col-md-6 col-xl-4" key={article.url}>
              <NewsCard
                article={article}
                isSaved={isSaved(article.url)}
                onToggleBookmark={onToggleBookmark}
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default SavedPage;
