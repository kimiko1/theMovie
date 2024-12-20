import { Link } from "react-router-dom";
import "../css/Navbar.css";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, isAuthenticated, userRole } = useAuth();

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Movies</Link>
        </li>
        <li>
          <Link to="/cars">Cars</Link>
        </li>
        {!isAuthenticated && (
          <>
            <li>
              <Link to="/register">Sign up</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </>
        )}
        {isAuthenticated && (
          <>
            <li>
              <Link to="/logout">Log Out</Link>
            </li>
            {userRole === "admin" && (
              <li>
                <Link to="/admin">Admin</Link>
              </li>
            )}
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
