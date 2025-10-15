import React, { useState } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="logo">Nanja<span>.</span></div>
      <nav className={menuOpen ? "nav open" : "nav"}>
        <a href="#home">Accueil</a>
        <a href="#projects">Projets</a>
        <a href="#about">À propos</a>
        <a href="#contact">Contact</a>
      </nav>
      <div
        className={`menu-toggle ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </header>
  );
};

export default Navbar;
