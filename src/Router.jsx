import { Routes, Route } from "react-router-dom";
import App from "./App";
import NavBar from "./Components/NavBar";
import { MoviesController } from "./context/MoviesContext";
import MovieDetails from "./Components/MovieDetails";
import { Cars } from "./pages/Cars";
import Login from "./pages/login";
import { useAuth } from "./context/AuthContext";
import Logout from "./pages/logout";
import Signup from "./pages/Signup";
import AdminDashboard from "./pages/admin/AdminDashboard";
import { UsersProvider } from "./context/Admin/UsersContext";
import { CarsProvider } from "./context/Admin/CarsContext";

const Router = () => {
  const { isAuthenticated, userRole } = useAuth();

  return (
    <>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <MoviesController>
              <App />
            </MoviesController>
          }
        />
        <Route path="/cars" element={isAuthenticated ? <Cars /> : <Login />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />

        {/* Vérification du rôle utilisateur pour l'accès à /admin */}
        <Route
          path="/admin/*"
          element={
            isAuthenticated && userRole === "admin" ? (
              <UsersProvider>
                <CarsProvider>
                  <AdminDashboard />
                </CarsProvider>
              </UsersProvider>
            ) : (
              <h1>Access Denied</h1>
            )
          }
        />
        <Route path="/*" element={<h1>Error page not found</h1>} />
      </Routes>
    </>
  );
};

export default Router;
