import { useEffect, useState } from "react";
import ErrorMessage from "../components/ErrorMessage.jsx";
import FiltersBar from "../components/FiltersBar.jsx";
import NewsCard from "../components/NewsCard.jsx";
import Pagination from "../components/Pagination.jsx";
import SearchBar from "../components/SearchBar.jsx";
import SkeletonCards from "../components/SkeletonCards.jsx";
import { useNews } from "../hooks/useNews.js";
import { getCategoryLabel } from "../utils/categories.js";

function NewsPage({ category, isSaved, onToggleBookmark }) {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSource, setSelectedSource] = useState("all");
  const [sortOrder, setSortOrder] = useState("latest");

  const { articles, totalPages, totalResults, loading, error } = useNews({
    category,
    page,
    searchTerm,
  });

  useEffect(() => {
    setPage(1);
    setSearchTerm("");
    setSelectedSource("all");
    setSortOrder("latest");
  }, [category]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    setPage(1);
  };

  const categoryLabel = getCategoryLabel(category);

  const sources = [
    ...new Set(articles.map((article) => article.source?.name).filter(Boolean)),
  ];

  const visibleArticles = articles
    .filter((article) => {
      if (selectedSource === "all") {
        return true;
      }

      return article.source?.name === selectedSource;
    })
    .sort((firstArticle, secondArticle) => {
      const firstDate = new Date(firstArticle.publishedAt).getTime();
      const secondDate = new Date(secondArticle.publishedAt).getTime();

      return sortOrder === "latest"
        ? secondDate - firstDate
        : firstDate - secondDate;
    });

  return (
    <section className="news-page">
      <div className="page-header">
        <div>
          <p className="section-kicker">Latest headlines
</p>
          <h1>{categoryLabel} News</h1>
          <p className="text-muted mb-0">
            Live stories from trusted publishers, filtered by your interests.
          </p>
        </div>

        <div className="results-pill">
          {loading ? "Loading" : `${totalResults} results`}
        </div>
      </div>

      <SearchBar initialValue={searchTerm} onSearch={handleSearch} />

      {error && <ErrorMessage message={error} />}

      {loading && <SkeletonCards />}

      {!loading && !error && articles.length === 0 && (
        <div className="empty-state">
          <h2 className="h4">No stories found</h2>
          <p className="text-muted mb-0">
            Try another search term or switch to a different category.
          </p>
        </div>
      )}

      {!loading && !error && articles.length > 0 && (
        <>
          <FiltersBar
            sources={sources}
            selectedSource={selectedSource}
            sortOrder={sortOrder}
            onSourceChange={setSelectedSource}
            onSortChange={setSortOrder}
          />

          {visibleArticles.length === 0 && (
            <div className="empty-state mb-4">
              <h2 className="h4">No stories from this source</h2>
              <p className="text-muted mb-0">
                Choose another source or reset the filter to all sources.
              </p>
            </div>
          )}

          <div className="row g-4">
            {visibleArticles.map((article, index) => (
              <div className="col-12 col-md-6 col-xl-4" key={article.url}>
                <NewsCard
                  article={article}
                  isSaved={isSaved(article.url)}
                  isTrending={index < 3 && page === 1}
                  onToggleBookmark={onToggleBookmark}
                />
              </div>
            ))}
          </div>

          <Pagination
            page={page}
            totalPages={totalPages}
            loading={loading}
            onPageChange={setPage}
          />
        </>
      )}
    </section>
  );
}

export default NewsPage;
