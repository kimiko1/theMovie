import { Link } from "react-router-dom";
import "../css/Navbar.css"; // Import du fichier CSS

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
