
import React from "react";

const MovieList = ({ movies, onMovieSelect }) => {
  if (!movies.length) return <p>No Movies. Try a different search.</p>;

  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <div key={movie.imdbID} className="movie-item" onClick={() => onMovieSelect(movie.imdbID)}>
          <img src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.jpg"} alt={movie.Title} />
          <h3>{movie.Title}</h3>
          <p>{movie.Year}</p>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
