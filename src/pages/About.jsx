import React from "react";
import { Link } from "react-router-dom";
import "../styles/About.css";
import Navbar from "../components/Navbar";
import Profile from "../images/Photo.png";
import { generateCV } from "../utils/generateCV";
import aboutData from "../data/about.json";

const About = () => {
  const { name, degree, school, bio, securityExpertise, skills, experiences } = aboutData;

  return (
    <div className="page">
      <Navbar />
      <section className="about-section">
        <div className="container">

          {/* ── Header ── */}
          <div className="about-header reveal">
            <span className="section-tag">Profil Ingénieur</span>
            <h1 className="about-title gradient-text">Qui suis-je ?</h1>
            <p className="about-subtitle">
              {degree} diplômé de l'ISPM. Expert en développement Web Full Stack et en sécurisation applicative conforme OWASP.
            </p>
          </div>

          {/* ── Bio split ── */}
          <div className="about-bio">
            <div className="bio-image reveal-left d1">
              <div className="bio-img-frame">
                <img src={Profile} alt={name} />
                <div className="bio-img-glow" />
              </div>
              <div className="bio-card">
                <span className="bio-card-icon">🎓</span>
                <div>
                  <strong>{degree}</strong>
                  <span>{school}</span>
                </div>
              </div>
            </div>

            <div className="bio-text reveal-right d2">
              {bio.map((paragraph, i) => (
                <p key={i} dangerouslySetInnerHTML={{ __html: paragraph }} />
              ))}
              <div className="bio-actions">
                <button onClick={generateCV} className="btn-primary">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                  Télécharger CV (ATS)
                </button>
                <Link to="/projects" className="btn-outline">Voir mes projets</Link>
                <Link to="/contact" className="btn-outline">Me contacter</Link>
              </div>
            </div>
          </div>

          {/* ── Security OWASP Section ── */}
          {securityExpertise && (
            <div className="security-section">
              <div className="reveal">
                <span className="section-tag">Cyber-Sécurité & OWASP</span>
                <h2 className="skills-title">{securityExpertise.title}</h2>
                <p className="security-subtitle">{securityExpertise.subtitle}</p>
              </div>
              <div className="security-grid">
                {securityExpertise.pillars.map((pillar, i) => (
                  <div key={pillar.title} className={`security-card reveal d${i + 1}`}>
                    <div className="security-icon-wrapper">
                      <span className="security-icon">{pillar.icon}</span>
                    </div>
                    <h3 className="security-card-title">{pillar.title}</h3>
                    <p className="security-card-desc">{pillar.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Skills ── */}
          <div className="skills-section">
            <div className="reveal">
              <span className="section-tag">Compétences</span>
              <h2 className="skills-title">Stack technique & Ingénierie</h2>
            </div>
            <div className="skills-grid">
              {skills.map((group, i) => (
                <div key={group.category} className={`skill-group reveal d${i + 1}`}>
                  <h3 className="skill-cat">{group.category}</h3>
                  <div className="skill-pills">
                    {group.items.map((s) => (
                      <span key={s} className="skill-pill">{s}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Experience timeline ── */}
          <div className="experience-section">
            <div className="reveal">
              <span className="section-tag">Expérience</span>
              <h2 className="skills-title">Parcours d'Ingénieur</h2>
            </div>
            <div className="timeline">
              {experiences.map((exp, i) => (
                <div key={i} className={`timeline-item reveal d${i + 1}`}>
                  <div className="timeline-year">{exp.year}</div>
                  <div className="timeline-dot" />
                  <div className="timeline-content">
                    <h4 className="tl-role">{exp.role}</h4>
                    <span className="tl-org">{exp.org}</span>
                    <p className="tl-desc">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default About;
