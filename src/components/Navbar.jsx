import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/Navbar.css";
import { generateCV } from "../utils/generateCV";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("portfolio_theme") || "dark";
  });

  const location = useLocation();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("portfolio_theme", theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const links = [
    { to: "/", label: "Accueil" },
    { to: "/projects", label: "Projets" },
    { to: "/security", label: "Sécurité & OWASP" },
    { to: "/about", label: "À propos" },
  ];

  return (
    <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="container navbar-inner">
        <Link to="/" className="nav-logo">
          <span className="logo-name">Nanja Randriamalala</span>
          <span className="logo-badge">Ingénieur</span>
        </Link>

        <nav className={`nav-menu ${menuOpen ? "open" : ""}`}>
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`nav-link ${location.pathname === l.to ? "active" : ""}`}
            >
              {l.label}
            </Link>
          ))}

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="theme-toggle-btn"
            aria-label="Changer le thème"
            title={`Passer en mode ${theme === "dark" ? "Clair ☀️" : "Sombre 🌙"}`}
          >
            {theme === "dark" ? (
              // Sun icon for dark mode (click to go light)
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              // Moon icon for light mode (click to go dark)
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
            <span className="theme-toggle-label">{theme === "dark" ? "Clair" : "Sombre"}</span>
          </button>

          <button onClick={generateCV} className="nav-cv-btn" title="Télécharger le CV ATS (PDF)">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            CV ATS
          </button>

          <Link to="/contact" className="btn-primary nav-cta">
            Contact
          </Link>
        </nav>

        <button
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
