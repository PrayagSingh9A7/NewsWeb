import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import { useBookmarks } from "./hooks/useBookmarks.js";
import NewsPage from "./pages/NewsPage.jsx";
import NotFound from "./pages/NotFound.jsx";
import SavedPage from "./pages/SavedPage.jsx";
import { categories } from "./utils/categories.js";

function App() {
  const { savedArticles, isSaved, toggleBookmark, clearBookmarks } =
    useBookmarks();

  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    document.body.dataset.theme = isDarkMode ? "dark" : "light";
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  return (
    <div className="app-shell">
      <Navbar
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode((mode) => !mode)}
      />

      <main className="container py-4">
        <Routes>
          <Route
            path="/"
            element={
              <NewsPage
                category="general"
                isSaved={isSaved}
                onToggleBookmark={toggleBookmark}
              />
            }
          />

          {categories
            .filter((category) => category.slug !== "general")
            .map((category) => (
              <Route
                key={category.slug}
                path={`/${category.slug}`}
                element={
                  <NewsPage
                    category={category.slug}
                    isSaved={isSaved}
                    onToggleBookmark={toggleBookmark}
                  />
                }
              />
            ))}

          <Route
            path="/saved"
            element={
              <SavedPage
                savedArticles={savedArticles}
                isSaved={isSaved}
                onToggleBookmark={toggleBookmark}
                onClearBookmarks={clearBookmarks}
              />
            }
          />

          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <ScrollToTop />
    </div>
  );
}

export default App;
