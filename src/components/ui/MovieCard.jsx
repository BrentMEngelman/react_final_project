import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function MovieCard({ movie }) {
  const [imgError, setImgError] = useState(false);

  const toProperCase = (str) =>
    str
      ?.toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  const hasPoster = movie.Poster && movie.Poster !== "N/A" && !imgError;

  return (
    <div className="movie-card">
      <Link to={`/movie/${movie.imdbID}`}>
        <div className="movie-card__img-container">
          {hasPoster ? (
            <img
              className="movie-card__img"
              src={movie.Poster}
              alt={movie.Title}
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="movie-card__poster-placeholder">
              {movie.Title} <br />
              Poster <br />
              Not Available
            </div>
          )}
        </div>
      </Link>
      <h2 className="movie-card__title">{movie.Title}</h2>
      <p className="movie-card__year">{movie.Year}</p>
      <p className="movie-card__type">{toProperCase(movie.Type)}</p>
    </div>
  );
}