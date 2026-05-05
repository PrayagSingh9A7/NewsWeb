import { useEffect, useState } from "react";

const STORAGE_KEY = "savedArticles";

export function useBookmarks() {
  const [savedArticles, setSavedArticles] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedArticles));
  }, [savedArticles]);

  const isSaved = (articleUrl) => {
    return savedArticles.some((article) => article.url === articleUrl);
  };

  const toggleBookmark = (article) => {
    setSavedArticles((currentArticles) => {
      const alreadySaved = currentArticles.some(
        (savedArticle) => savedArticle.url === article.url
      );

      if (alreadySaved) {
        return currentArticles.filter(
          (savedArticle) => savedArticle.url !== article.url
        );
      }

      return [article, ...currentArticles];
    });
  };

  const clearBookmarks = () => {
    setSavedArticles([]);
  };

  return {
    savedArticles,
    isSaved,
    toggleBookmark,
    clearBookmarks,
  };
}
