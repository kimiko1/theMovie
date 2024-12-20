import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/Signup.css";

const Signup = () => {
  const navigate = useNavigate();

  // États pour les champs du formulaire
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Gestion des erreurs
  const [error, setError] = useState("");

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérifier si les mots de passe correspondent
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      // Appel API pour créer un utilisateur
      const response = await axios.post("https://node-intro-a9xe.onrender.com/register", {
        email,
        name,
        last_name: lastName,
        password,
      });

      // Si la création est réussie, rediriger vers la page de connexion
      if (response.status === 201) {
        navigate("/login");
      }
    } catch (err) {
      // Gérer les erreurs (par exemple, email déjà pris)
      setError(err.response?.data?.message || "Une erreur s'est produite.");
    }
  };

  return (
    <div className="signup-container">
      <h1 className="signup-title">Sign Up</h1>

      {/* Affichage des erreurs */}
      {error && <p className="signup-error">{error}</p>}

      <form className="signup-form" onSubmit={handleSubmit}>
        <div>
          <label className="signup-label" htmlFor="name">Nom</label>
          <input
            className="signup-input"
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="signup-label" htmlFor="lastName">Prénom</label>
          <input
            className="signup-input"
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="signup-label" htmlFor="email">Email</label>
          <input
            className="signup-input"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="signup-label" htmlFor="password">Mot de passe</label>
          <input
            className="signup-input"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="signup-label" htmlFor="confirmPassword">Confirmer le mot de passe</label>
          <input
            className="signup-input"
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button className="signup-button" type="submit">Créer un compte</button>
      </form>
    </div>
  );
};

export default Signup;
