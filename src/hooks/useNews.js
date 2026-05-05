import { useEffect, useState } from "react";

const PAGE_SIZE = 9;

function buildNewsUrl({ category, page, searchTerm }) {
  const params = new URLSearchParams({
    category,
    page: page.toString(),
    search: searchTerm.trim(),
  });

  // 🔥 Check environment
  if (import.meta.env.DEV) {
  
    return `https://gnews.io/api/v4/top-headlines?lang=en&country=in&max=9&apikey=${import.meta.env.VITE_GNEWS_API_KEY}`;
  } else {
  
    return `/api/news?${params.toString()}`;
  }
}

export function useNews({ category, page, searchTerm }) {
  const [articles, setArticles] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchNews() {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          buildNewsUrl({ category, page, searchTerm }),
          { signal: controller.signal }
        );

        const data = await response.json();

        if (!response.ok || data.errors) {
          throw new Error(data.errors?.[0] || "Unable to fetch the latest news.");
        }

        setArticles(data.articles || []);
        setTotalResults(data.totalArticles || data.articles?.length || 0);
      } catch (err) {
        if (err.name !== "AbortError") {
          setArticles([]);
          setTotalResults(0);
          setError(err.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchNews();

    return () => controller.abort();
  }, [category, page, searchTerm]);

  return {
    articles,
    totalResults,
    totalPages: Math.max(1, Math.ceil(totalResults / PAGE_SIZE)),
    loading,
    error,
  };
}
