import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { Navigate } from "react-router-dom";

const Logout = () => {
  const { logout, isAuthenticated } = useAuth();

  useEffect(() => {
    logout(); // Appelle la fonction de déconnexion
  }, [logout]);

  // Si l'utilisateur est déconnecté, redirige vers la page de connexion
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <h1>Déconnexion en cours...</h1>
      <p>Vous allez être redirigé vers la page de connexion.</p>
    </div>
  );
};

export default Logout;