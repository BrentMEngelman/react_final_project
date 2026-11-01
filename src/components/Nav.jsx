import React from "react";
import { Link } from "react-router-dom";
import logoImg from "../assets/fes-logo.png"; 

export default function Nav({
  searchTerm,
  setSearchTerm,
  selectedType,
  setSelectedType,
  knownTypes,
  onSearchSubmit,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearchSubmit();
  };

  const toProperCase = (str) =>
    str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  return (
    <nav>
      <Link to="/" className="logo">
        <img
          src={logoImg}
          alt="Logo"
          className="logo__img"
          width="50px"
        />
        <div className="logo__title">
          <span>Simplified</span> Flix
        </div>
      </Link>

      <form className="search-form" onSubmit={handleSubmit}>
        <input
          className="search-form__input"
          type="text"
          placeholder="Search movie..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          required
        />
        <div className="search-form__actions">
          <select
            id="typeFilter"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="">All Types</option>
            {Array.from(knownTypes).map((type) => (
              <option key={type} value={type}>
                {toProperCase(type)}
              </option>
            ))}
          </select>
          <button className="search-form__button" type="submit" aria-label="Search">
            Search
          </button>
        </div>
      </form>
    </nav>
  );
}