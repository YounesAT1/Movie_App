import React, { useState } from "react";
import "./App.css";
import searchIcon from "./search.svg";
import MovieCard from "./MovieCard";

const API_URL = "http://www.omdbapi.com?apikey=f496ea2f";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const searchMovies = async (title) => {
    const res = await fetch(`${API_URL}&s=${title}`);
    const data = await res.json();

    setMovies(data.Search || []);
  };

  const handleSearch = () => {
    searchMovies(searchTerm);
  };

  return (
    <div className="app">
      <h1>Movie Land</h1>

      <div className="search">
        <input
          type="text"
          placeholder="Enter Movie Title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img src={searchIcon} alt="search" onClick={handleSearch} />
      </div>

      {movies.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
