

import React, { useState, useCallback } from "react";
import axios from "axios";
import debounce from "lodash.debounce";
import SearchBar from "./components/SearchBar";
import MovieList from "./components/MovieList";
import MovieDetail from "./components/MovieDetail";
import "./App.css";

const API_KEY = "4d4e1a3f";
const API_URL = "https://www.omdbapi.com/";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchMovies = async (query) => {
    if (!query) return; 
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(`${API_URL}?s=${query}&apikey=${API_KEY}`);
      setMovies(response.data.Search || []);
      setSelectedMovie(null);
    } catch (err) {
      setError("Failed to fetch movies. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = useCallback(debounce(searchMovies, 500), []);

  const selectMovie = async (id) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}?i=${id}&apikey=${API_KEY}`);
      setSelectedMovie(response.data);
    } catch (err) {
      setError("Failed to fetch movie details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Movie Search App</h1>
      <SearchBar onSearch={debouncedSearch} />
      {error && <p className="error">{error}</p>}
      <div className="content">
        {loading ? <p>Loading...</p> : <MovieList movies={movies} onMovieSelect={selectMovie} />}
        {selectedMovie && <MovieDetail movie={selectedMovie} />}
      </div>
    </div>
  );
};

export default App;
