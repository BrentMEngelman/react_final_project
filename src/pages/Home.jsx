import React, { useMemo } from "react";
import MovieCard from "../components/ui/MovieCard";
import Pagination from "../components/Pagination";

export default function Home({
  movies,
  activeSearch,
  totalResults,
  currentPage,
  onPageChange,
  sortOption,
  setSortOption,
  loading,
  error,
}) {
  const sortedMovies = useMemo(() => {
    let list = [...movies];
    return list.sort((a, b) => {
      if (sortOption === "a-z") return a.Title.localeCompare(b.Title);
      if (sortOption === "z-a") return b.Title.localeCompare(a.Title);
      if (sortOption === "oldest") return parseInt(a.Year, 10) - parseInt(b.Year, 10);
      if (sortOption === "newest") return parseInt(b.Year, 10) - parseInt(a.Year, 10);
      return 0;
    });
  }, [movies, sortOption]);

  return (
    <>
      <div className="controls">
        <p className="resultsInfo">
          <span>Showing: </span>
          <span>{activeSearch}</span>
        </p>

        <select
          id="sortSelect"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="a-z">A to Z</option>
          <option value="z-a">Z to A</option>
          <option value="newest">Newest to Oldest</option>
          <option value="oldest">Oldest to Newest</option>
        </select>
      </div>

      {loading && <p style={{ textAlign: "center" }}>Loading movies...</p>}

      {!loading && error && <p style={{ textAlign: "center" }}>{error}</p>}

      {!loading && !error && (
        <>
          <div className="movies-grid">
            {sortedMovies.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))}
          </div>

          <Pagination
            totalResults={totalResults}
            currentPage={currentPage}
            onPageChange={onPageChange}
          />
        </>
      )}
    </>
  );
}