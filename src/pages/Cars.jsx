import axios from "axios";
import React, { useEffect, useState } from "react";
import { CarsList } from "../Components/CarsList.jsx";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export const Cars = () => {
  const { isAuthenticated, token } = useAuth();
  const [cars, setCars] = useState([]);

  useEffect(() => {
    if (!token) {
      console.error("Token is missing");
      return; // Ne lance pas la requête si le token est manquant
    }

    axios
      .get("https://node-intro-a9xe.onrender.com/cars", {
        headers: {
          Authorization: `Bearer ${token}`, // Envoi du token dans l'en-tête
        },
      })
      .then((res) => setCars(res.data))
      .catch((err) => console.error("Error fetching cars:", err));
  }, [token]); // La dépendance `token` permet de relancer l'effet quand il change

  if (!isAuthenticated) {
    return <Navigate to="/login" />; // Redirige l'utilisateur si non authentifié
  }

  return (
    <div>
      <h1>Cars</h1>
      {cars.length > 0 ? (
        <CarsList cars={cars} />
      ) : (
        <p style={{ textAlign: "center" }}>Loading cars...</p>
      )}
    </div>
  );
};