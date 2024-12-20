import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { jwtDecode } from "jwt-decode";

// Création du contexte d'authentification
const AuthContext = createContext();

// Fournisseur du contexte d'authentification
export const AuthController = ({ children }) => {
  // Initialisation du token à partir de localStorage
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [userRole, setUserRole] = useState(null); // Ajouter un état pour stocker le rôle de l'utilisateur

  // Effet pour synchroniser le token avec localStorage et décoder le rôle de l'utilisateur
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      // Décoder le token pour récupérer le rôle de l'utilisateur
      const decoded = jwtDecode(token);
      setUserRole(decoded.role); // Stocker le rôle dans l'état
    } else {
      localStorage.removeItem("token");
      setUserRole(null); // Réinitialiser le rôle si le token est supprimé
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
    userRole, // Ajouter userRole au contexte
    logout
  }), [token, isAuthenticated, userRole]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte d'authentification
export const useAuth = () => useContext(AuthContext);