import { useEffect, useState } from "react";

const API_URL = "https://gnews.io/api/v4";
const PAGE_SIZE = 9;

const topicMap = {
  general: "breaking-news",
  business: "business",
  sports: "sports",
  technology: "technology",
  health: "health",
  science: "science",
};

function buildNewsUrl({ category, page, searchTerm }) {
  const apiKey = import.meta.env.VITE_GNEWS_API_KEY || "";

  const params = new URLSearchParams({
    lang: "en",
    country: "in",
    max: PAGE_SIZE.toString(),
    page: page.toString(),
    apikey: apiKey,
  });

  if (searchTerm.trim()) {
    params.append("q", searchTerm.trim());
    return `${API_URL}/search?${params.toString()}`;
  }

  params.append("topic", topicMap[category] || "breaking-news");
  return `${API_URL}/top-headlines?${params.toString()}`;
}

export function useNews({ category, page, searchTerm }) {
  const [articles, setArticles] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const apiKey = import.meta.env.VITE_GNEWS_API_KEY;

    if (!apiKey || apiKey === "your_gnews_api_key_here") {
      setArticles([]);
      setTotalResults(0);
      setLoading(false);
      setError("Add your GNews API key to the .env file as VITE_GNEWS_API_KEY.");
      return;
    }

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
