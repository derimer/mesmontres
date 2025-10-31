import { Link } from "react-router-dom";
import { FaUser, FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";
import "./Navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="navbar">
      <div className="navbar-inner">
        {/* Logo centré */}
        <div className="navbar-left">
          <Link to="/" className="navbar-logo" onClick={closeMenu}>
            <img src="../images/logo6.jpg" alt="Logo" />
            <span>Les garde-temps du Rieutord</span>
          </Link>
        </div>

        {/* Menu Desktop */}
        <nav className={`navbar-links ${menuOpen ? "open" : ""}`}>
          <Link to="/" onClick={closeMenu}>
            Accueil
          </Link>
          <Link to="/a-propos" onClick={closeMenu}>
            À propos
          </Link>
          <Link to="/montres" onClick={closeMenu}>
            Montres
          </Link>
          <Link to="/categories" onClick={closeMenu}>
            Catégories
          </Link>
          <Link to="/contact" onClick={closeMenu}>
            Contact
          </Link>
        </nav>

        {/* Icônes */}
        <div className="navbar-icons">
          <Link to="/admin" title="Administration" onClick={closeMenu}>
            <FaUser className="icon" />
          </Link>

          <button
            type="button"
            className="navbar-toggle"
            onClick={toggleMenu}
            aria-label="Ouvrir le menu"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
    </header>
  );
}
