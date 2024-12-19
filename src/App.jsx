import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { MoviesContext } from './context/MoviesContext';
import MovieCard from './Components/MovieCard';

function App() {
  const { movies, searchResults, query, setQuery, handleSearch } = useContext(MoviesContext);

  const onSearchSubmit = (e) => {
    e.preventDefault();
    handleSearch(query);
  };

  return (
    <div className="app">
      <header>
        <h1>TMDB Movie App</h1>
        <form onSubmit={onSearchSubmit}>
          <input
            type="text"
            placeholder="Search for a movie..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </header>
      <Routes>
        <Route
          path="/"
          element={
            <main>
              <h2>{searchResults.length > 0 ? 'Search Results' : 'Now Playing'}</h2>
              <div className="movie-grid">
                {(searchResults.length > 0 ? searchResults : movies).map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            </main>
          }
        />
      </Routes>
    </div>
  );
}

export default App;