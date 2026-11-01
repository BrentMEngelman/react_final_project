import React, { useState, useEffect, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import MovieDetails from "./components/ui/MovieDetails";
import { searchMovies } from "./sevices/omdbApi";

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSearch, setActiveSearch] = useState("Marvel");
  const [selectedType, setSelectedType] = useState("");
  const [knownTypes, setKnownTypes] = useState(new Set());

  const [movies, setMovies] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("a-z");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const executeSearch = useCallback(async (query, page, type) => {
    setLoading(true);
    setError(null);

    const queryToFetch = query.trim() || "Marvel";
    setActiveSearch(queryToFetch);

    const data = await searchMovies(queryToFetch, page, type);

    if (data.Response === "True") {
      setMovies(data.Search);
      setTotalResults(parseInt(data.totalResults, 10));

      setKnownTypes((prev) => {
        const next = new Set(prev);
        data.Search.forEach((m) => m.Type && next.add(m.Type));
        return next;
      });
    } else {
      setMovies([]);
      setTotalResults(0);
      setError(data.Error || "No results found.");
    }

    setLoading(false);
  }, []);

  // Initial fetch on mount or type change
  useEffect(() => {
    executeSearch(searchTerm, currentPage, selectedType);
  }, [currentPage, selectedType]);

  const handleSearchSubmit = () => {
    setCurrentPage(1);
    executeSearch(searchTerm, 1, selectedType);
  };

  return (
    <Router>
      <Layout
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        knownTypes={knownTypes}
        onSearchSubmit={handleSearchSubmit}
      >
        <Routes>
          <Route
            path="/"
            element={
              <Home
                movies={movies}
                activeSearch={activeSearch}
                totalResults={totalResults}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                sortOption={sortOption}
                setSortOption={setSortOption}
                loading={loading}
                error={error}
              />
            }
          />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </Layout>
    </Router>
  );
}
