import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Accueil.css";
import profileImg from "../images/Photo.png";
import Navbar from "../components/Navbar";
import heroData from "../data/hero.json";
import contactData from "../data/contact.json";
import { generateCV } from "../utils/generateCV";

const Home = () => {
  const { name, badge, roles, description, stack, stats, cta } = heroData;

  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    let timeout;
    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 60);
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIndex((i) => (i + 1) % roles.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIndex, roles]);

  const githubLink = contactData.socials.find(s => s.type === "github");
  const linkedinLink = contactData.socials.find(s => s.type === "linkedin");

  return (
    <div className="page">
      <Navbar />
      <section className="hero">
        <div className="container hero-inner">

          {/* ── Left content ── */}
          <div className="hero-content">
            <div className="hero-badge reveal">
              <span className="badge-dot" />
              {badge}
            </div>

            <h1 className="hero-title reveal d1">
              Salut, je suis<br />
              <span className="accent-text">{name}</span>
            </h1>

            <div className="hero-role reveal d2">
              <span className="role-prefix">~/dev $ </span>
              <span className="role-text">{displayed}</span>
              <span className="cursor-blink">|</span>
            </div>

            <p className="hero-desc reveal d3">{description}</p>

            {/* Actions: View projects, Contact, and Download ATS CV */}
            <div className="hero-actions reveal d4">
              <Link to={cta.primary.to} className="btn-primary">
                {cta.primary.label}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
              
              <button onClick={generateCV} className="btn-outline cv-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Télécharger CV (ATS)
              </button>

              <Link to={cta.secondary.to} className="btn-outline">
                {cta.secondary.label}
              </Link>
            </div>

            {/* Quick Profile Links */}
            <div className="hero-social-chips reveal d5">
              {githubLink && (
                <a href={githubLink.href} target="_blank" rel="noreferrer" className="social-chip">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                  </svg>
                  GitHub
                </a>
              )}
              {linkedinLink && (
                <a href={linkedinLink.href} target="_blank" rel="noreferrer" className="social-chip">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                    <circle cx="4" cy="4" r="2"/>
                  </svg>
                  LinkedIn
                </a>
              )}
            </div>

            <div className="hero-stack reveal d6">
              {stack.map((tech) => (
                <span key={tech} className="stack-badge">{tech}</span>
              ))}
            </div>
          </div>

          {/* ── Right visual ── */}
          <div className="hero-visual reveal-right d2">
            <div className="photo-wrapper">
              <div className="photo-glow" />
              <img src={profileImg} alt={name} className="photo" />
            </div>
            <div className="hero-stats">
              {stats.map((stat) => (
                <div key={stat.label} className="stat-card">
                  <span className="stat-num accent-text">{stat.value}</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        <div className="hero-scroll-indicator">
          <div className="scroll-line" />
          <span>Scroll</span>
        </div>
      </section>
    </div>
  );
};

export default Home;
