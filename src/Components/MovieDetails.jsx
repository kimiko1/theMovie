import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReactPlayer from 'react-player';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState(null);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/movie/${id}`, {
        params: {
          api_key: API_KEY,
          language: 'en-US',
        },
      })
      .then((response) => {
        setMovie(response.data);
      })
      .catch((error) => console.error(error));

    axios
      .get(`${BASE_URL}/movie/${id}/videos`, {
        params: {
          api_key: API_KEY,
          language: 'en-US',
        },
      })
      .then((response) => {
        const trailers = response.data.results.filter(
          (video) => video.type === 'Trailer' && video.site === 'YouTube'
        );
        if (trailers.length > 0) {
          setTrailerUrl(`https://www.youtube.com/watch?v=${trailers[0].key}`);
        }
      })
      .catch((error) => console.error('Error fetching trailer:', error));
  }, [id]);

  if (!movie) return <div>Loading...</div>;

  const { title, overview, poster_path, vote_average, release_date } = movie;
  const imageUrl = `https://image.tmdb.org/t/p/w500${poster_path}`;

  return (
    <div className="movie-details">
      <img src={imageUrl} alt={title} />
      <div>
        <h1>{title}</h1>
        <p><strong>Rating:</strong> {vote_average}</p>
        <p><strong>Release Date:</strong> {release_date}</p>
        <p>{overview}</p>
        {trailerUrl ? (
          <div className="trailer">
            <h2>Trailer</h2>
            <ReactPlayer url={trailerUrl} controls={true} />
          </div>
        ) : (
          <p>No trailer available.</p>
        )}
      </div>
    </div>
  );
}

export default MovieDetails;
