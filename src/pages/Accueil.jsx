import React from "react";
import { Link } from "react-router-dom";
import "../styles/Accueil.css";
import profileImg from "../images/Photo.png";
import Navbar from "../components/Navbar";
import heroData from "../data/hero.json";
import contactData from "../data/contact.json";
import { generateCV } from "../utils/generateCV";

const Home = () => {
  const { name, badge, description, stack, stats, cta } = heroData;

  const githubLink = contactData.socials.find((s) => s.type === "github");
  const linkedinLink = contactData.socials.find((s) => s.type === "linkedin");

  return (
    <div className="page">
      <Navbar />
      <section className="hero-section">
        <div className="container">
          
          {/* Main Hero Card */}
          <div className="hero-grid">
            
            {/* Left Content */}
            <div className="hero-main">
              <div className="hero-status reveal">
                <span className="status-indicator" />
                <span className="status-text">{badge}</span>
              </div>

              <h1 className="hero-headline reveal d1">
                {name}
              </h1>

              <h2 className="hero-subheadline reveal d2">
                Ingénieur Développeur Web Full Stack & Expert Sécurité OWASP
              </h2>

              <p className="hero-bio reveal d3">
                {description}
              </p>

              {/* Call to Actions */}
              <div className="hero-actions reveal d4">
                <Link to={cta.primary.to} className="btn-primary">
                  {cta.primary.label}
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>

                <button onClick={generateCV} className="btn-outline">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Télécharger CV (ATS)
                </button>

                <Link to={cta.secondary.to} className="btn-outline">
                  Me contacter
                </Link>
              </div>

              {/* Social Links */}
              <div className="hero-socials reveal d5">
                {githubLink && (
                  <a href={githubLink.href} target="_blank" rel="noreferrer" className="hero-social-link">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                    GitHub (github.com/nanja98)
                  </a>
                )}
                {linkedinLink && (
                  <a href={linkedinLink.href} target="_blank" rel="noreferrer" className="hero-social-link">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                    LinkedIn Profile
                  </a>
                )}
              </div>
            </div>

            {/* Right Profile Frame & Quick Stats */}
            <div className="hero-aside reveal d2">
              <div className="profile-frame">
                <img src={profileImg} alt={name} className="profile-image" />
              </div>

              <div className="metrics-grid">
                {stats.map((stat, idx) => (
                  <div key={idx} className="metric-card">
                    <div className="metric-value">{stat.value}</div>
                    <div className="metric-label">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Tech Stack Banner */}
          <div className="tech-banner reveal d5">
            <span className="tech-banner-label">Stack Technique & Compétences :</span>
            <div className="tech-tags">
              {stack.map((item) => (
                <span key={item} className="tech-tag">{item}</span>
              ))}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Home;
