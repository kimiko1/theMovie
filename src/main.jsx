import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./Components/NavBar";
import App from "./App";
import "./css/index.css";
import { MoviesController } from "./context/MoviesContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <MoviesController>
        <Navbar />
        <App />
      </MoviesController>
    </BrowserRouter>
  </React.StrictMode>
);
