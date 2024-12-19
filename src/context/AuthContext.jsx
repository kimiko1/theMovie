import { createContext, useContext, useState, useEffect, useMemo } from "react";

// Création du contexte d'authentification
const AuthContext = createContext();

// Fournisseur du contexte d'authentification
export const AuthController = ({ children }) => {
  // Initialisation du token à partir de localStorage
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  // Effet pour synchroniser le token avec localStorage
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  // Vérifie si un token existe
  const isAuthenticated = useMemo(() => !!token, [token]);

  // Fonction de déconnexion
  const logout = () => {
    setToken(null); // Supprime le token du contexte
  };

  // Valeur du contexte
  const contextValue = useMemo(() => ({
    token,
    setToken,
    isAuthenticated,
    logout
  }), [token, isAuthenticated]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte d'authentification
export const useAuth = () => useContext(AuthContext);