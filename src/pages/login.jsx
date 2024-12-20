import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext"; // Import du context
import { useNavigate } from "react-router-dom";
import "../css/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setToken } = useAuth(); // Setter pour le token à partir du contexte
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://node-intro-a9xe.onrender.com/login", {
        email,
        password,
      });

      const token = response.data.token; // Assurez-vous que le token est dans cette propriété
      setToken(token); // Stocker le token dans le contexte
      navigate("/"); // Rediriger après connexion
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Login</h1>
      {error && <p className="login-error">{error}</p>}
      <form className="login-form" onSubmit={handleLogin}>
        <label className="login-label">Email:</label>
        <input
          className="login-input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label className="login-label">Password:</label>
        <input
          className="login-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="login-button" type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
