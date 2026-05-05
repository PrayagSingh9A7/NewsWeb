import { formatDate } from "../utils/formatDate.js";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=80";

function NewsCard({
  article,
  isSaved = false,
  isTrending = false,
  onToggleBookmark,
}) {
  const imageUrl = article.urlToImage || article.image || FALLBACK_IMAGE;

  return (
    <article className="card news-card h-100">
      <div className="news-image-wrap">
        <img
          src={imageUrl}
          className="card-img-top news-card-image"
          alt={article.title || "News article"}
          loading="lazy"
        />

        {isTrending && <span className="trending-badge">Trending</span>}
      </div>

      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between gap-3 mb-3 small text-muted">
          <span>{article.source?.name || "Unknown Source"}</span>
          <time dateTime={article.publishedAt}>
            {formatDate(article.publishedAt)}
          </time>
        </div>

        <h2 className="h5 card-title">{article.title}</h2>

        <p className="card-text text-muted flex-grow-1">
          {article.description || "No description is available for this story."}
        </p>

        <div className="card-actions mt-3">
          <a
            className="btn btn-primary"
            href={article.url}
            target="_blank"
            rel="noreferrer"
          >
            Read More
          </a>

          {onToggleBookmark && (
            <button
              className={`btn ${isSaved ? "btn-success" : "btn-outline-primary"}`}
              type="button"
              onClick={() => onToggleBookmark(article)}
            >
              {isSaved ? "Saved" : "Save"}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

export default NewsCard;
