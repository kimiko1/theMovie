import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const MoviesContext = createContext();

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export function MoviesController({ children }) {
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
  const handleSearch = (query) => {
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
    <MoviesContext.Provider value={{ movies, searchResults, query, setQuery, handleSearch }}>
      {children}
    </MoviesContext.Provider>
  );
}