import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';
import MovieCard from './Components/MovieCard';
import MovieDetails from './Components/MovieDetails';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // Récupérer les films les plus récents
  useEffect(() => {
    axios
      .get(`${BASE_URL}/movie/now_playing`, {
        params: {
          api_key: API_KEY,
          language: 'en-US',
          page: 1,
        },
      })
      .then((response) => {
        const filteredMovies = response.data.results.filter(movie => movie.poster_path);
        setMovies(filteredMovies);
      })
      .catch((error) => console.error(error));
  }, []);

  // Gestion de la recherche de films
  const handleSearch = (e) => {
    e.preventDefault();
    if (!query) return;

    axios
      .get(`${BASE_URL}/search/movie`, {
        params: {
          api_key: API_KEY,
          query,
          language: 'en-US',
          page: 1,
        },
      })
      .then((response) => {
        const filteredResults = response.data.results.filter(movie => movie.poster_path);
        setSearchResults(filteredResults);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="app">
      <header>
        <h1>TMDB Movie App</h1>
        <form onSubmit={handleSearch}>
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
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </div>
  );
}

export default App;