import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getMovieDetails } from "../../sevices/omdbApi";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDetails() {
      setLoading(true);
      const data = await getMovieDetails(id);
      setMovie(data);
      setLoading(false);
    }
    fetchDetails();
  }, [id]);

  if (loading) return <p style={{ textAlign: "center" }}>Loading details...</p>;
  if (!movie || movie.Response === "False")
    return <p>Movie details not found.</p>;

  return (
    <div style={{ maxWidth: "800px", margin: "20px auto", color: "#333" }}>
      <Link to="/" style={{ textDecoration: "none", color: "#00b5e7" }}>
        &larr; Back to search
      </Link>
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        {movie.Poster !== "N/A" && (
          <img
            src={movie.Poster}
            alt={movie.Title}
            style={{ borderRadius: "12px", width: "300px" }}
          />
        )}
        <div>
          <h2>
            {movie.Title} ({movie.Year})
          </h2>
          <p>
            <strong>Genre:</strong> {movie.Genre}
          </p>
          <p>
            <strong>Director:</strong> {movie.Director}
          </p>
          <p>
            <strong>Actors:</strong> {movie.Actors}
          </p>
          <p>
            <strong>Rating:</strong> ⭐ {movie.imdbRating}
          </p>
          <p>
            <strong>Plot:</strong> {movie.Plot}
          </p>
        </div>
      </div>
    </div>
  );
}
