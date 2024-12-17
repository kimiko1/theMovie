import React from 'react';
import { useNavigate } from 'react-router-dom';

function MovieCard({ movie }) {
  const { id, title, vote_average, poster_path } = movie;
  const imageUrl = `https://image.tmdb.org/t/p/w500${poster_path}`;
  const navigate = useNavigate();

  return (
    <div className="movie-card" onClick={() => navigate(`/movie/${id}`)}>
      <img src={imageUrl} alt={title} />
      <h3>{title}</h3>
      <p>Rating: {vote_average}</p>
    </div>
  );
}

export default MovieCard;