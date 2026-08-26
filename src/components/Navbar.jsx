import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/Navbar.css";
import { generateCV } from "../utils/generateCV";
import { useLanguage } from "../context/LanguageContext";
import TerminalModal from "./TerminalModal";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  const { lang, toggleLanguage } = useLanguage();

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

  // Global Ctrl + K / Cmd + K shortcut to toggle terminal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsTerminalOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const navLabels = {
    fr: [
      { to: "/", label: "Accueil" },
      { to: "/projects", label: "Projets" },
      { to: "/security", label: "Sécurité & OWASP" },
      { to: "/about", label: "À propos" },
    ],
    en: [
      { to: "/", label: "Home" },
      { to: "/projects", label: "Projects" },
      { to: "/security", label: "Security & OWASP" },
      { to: "/about", label: "About" },
    ]
  };

  const links = navLabels[lang];

  return (
    <>
      <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="container navbar-inner">
          <Link to="/" className="nav-logo">
            <span className="logo-name">Nanja Randriamalala</span>
            <span className="logo-badge">{lang === "fr" ? "Ingénieur" : "Engineer"}</span>
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

            {/* Interactive CLI Terminal Button */}
            <button
              onClick={() => setIsTerminalOpen(true)}
              className="nav-cli-btn"
              title={lang === "fr" ? "Ouvrir le terminal interactif CLI (Ctrl + K)" : "Open CLI interactive terminal (Ctrl + K)"}
            >
              <span className="cli-icon">&gt;_</span>
              <span className="cli-text">CLI</span>
            </button>

            {/* Language Switcher Button */}
            <button
              onClick={toggleLanguage}
              className="lang-toggle-btn"
              title={lang === "fr" ? "Switch to English" : "Passer en Français"}
            >
              <span className="lang-flag">{lang === "fr" ? "🇫🇷" : "🇬🇧"}</span>
              <span className="lang-code">{lang.toUpperCase()}</span>
            </button>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="theme-toggle-btn"
              aria-label="Changer le thème"
              title={`Mode ${theme === "dark" ? (lang === "fr" ? "Clair ☀️" : "Light ☀️") : (lang === "fr" ? "Sombre 🌙" : "Dark 🌙")}`}
            >
              {theme === "dark" ? (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>

            <button onClick={() => generateCV(lang)} className="nav-cv-btn" title="CV ATS (PDF)">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              CV ATS
            </button>

            <Link to="/contact" className="btn-primary nav-cta">
              {lang === "fr" ? "Contact" : "Contact"}
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

      {/* CLI Terminal Modal */}
      <TerminalModal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        toggleTheme={toggleTheme}
        currentTheme={theme}
      />
    </>
  );
};

export default Navbar;
