import { Link } from "react-router-dom";
import "../css/Navbar.css"; // Import du fichier CSS

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Movies</Link>
        </li>
        <li>
          <Link to="/cars">Cars</Link>
        </li>
        <li>
          <Link to="/register">Sign up</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/logout">Log Out</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
