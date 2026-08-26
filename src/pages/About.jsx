import React from "react";
import { Link } from "react-router-dom";
import "../styles/About.css";
import Navbar from "../components/Navbar";
import Profile from "../images/Photo.png";
import { generateCV } from "../utils/generateCV";
import aboutData from "../data/about.json";
import { useLanguage } from "../context/LanguageContext";

const About = () => {
  const { lang } = useLanguage();
  const data = aboutData[lang] || aboutData.fr;

  const { name, degree, school, bio, securityExpertise, skills, experiences } = data;

  return (
    <div className="page">
      <Navbar />
      <section className="about-section">
        <div className="container">

          {/* Page Header */}
          <div className="about-header reveal">
            <span className="section-tag">{lang === "fr" ? "Profil & Parcours" : "Profile & Background"}</span>
            <h1 className="section-title">
              {lang === "fr" ? "Ingénieur Développeur Full Stack & Sécurité" : "Full Stack Web & Security Engineer"}
            </h1>
            <p className="section-subtitle">
              {degree} — {school}. {lang === "fr" ? "Expertise en développement React/Node.js et en conformité OWASP Top 10." : "Expertise in React/Node.js development and OWASP Top 10 compliance."}
            </p>
          </div>

          {/* Bio Grid */}
          <div className="bio-grid">
            <div className="bio-photo-card reveal d1">
              <img src={Profile} alt={name} className="bio-photo" />
              <div className="bio-photo-meta">
                <strong>{degree}</strong>
                <span>{school}</span>
              </div>
            </div>

            <div className="bio-content reveal d2">
              <h2 className="bio-heading">{lang === "fr" ? "Présentation" : "Overview"}</h2>
              {bio.map((paragraph, idx) => (
                <p key={idx} className="bio-p" dangerouslySetInnerHTML={{ __html: paragraph }} />
              ))}

              <div className="bio-cta-row">
                <button onClick={() => generateCV(lang)} className="btn-primary">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  {lang === "fr" ? "Télécharger le CV ATS (PDF)" : "Download ATS CV (PDF)"}
                </button>
                <Link to="/contact" className="btn-outline">
                  {lang === "fr" ? "Contact" : "Contact"}
                </Link>
              </div>
            </div>
          </div>

          {/* Security OWASP Focus */}
          {securityExpertise && (
            <div className="sec-block reveal d3">
              <span className="section-tag">{lang === "fr" ? "Cyber-Sécurité Web" : "Web Cyber-Security"}</span>
              <h2 className="section-title">{securityExpertise.title}</h2>
              <p className="section-subtitle">{securityExpertise.subtitle}</p>

              <div className="sec-grid">
                {securityExpertise.pillars.map((pillar) => (
                  <div key={pillar.title} className="sec-card">
                    <div className="sec-icon">{pillar.icon}</div>
                    <h3 className="sec-title">{pillar.title}</h3>
                    <p className="sec-desc">{pillar.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills Matrix */}
          <div className="skills-block reveal d4">
            <span className="section-tag">{lang === "fr" ? "Compétences Techniques" : "Technical Skills"}</span>
            <h2 className="section-title">
              {lang === "fr" ? "Matrice de Compétences d'Ingénieur" : "Engineering Skills Matrix"}
            </h2>

            <div className="skills-grid">
              {skills.map((group) => (
                <div key={group.category} className="skill-card">
                  <h3 className="skill-cat-title">{group.category}</h3>
                  <div className="skill-chip-list">
                    {group.items.map((item) => (
                      <span key={item} className="skill-chip">{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Experience Timeline */}
          <div className="timeline-block reveal d5">
            <span className="section-tag">{lang === "fr" ? "Expérience Professionnelle" : "Work Experience"}</span>
            <h2 className="section-title">{lang === "fr" ? "Parcours & Missions" : "Career & Projects"}</h2>

            <div className="timeline-list">
              {experiences.map((exp, idx) => (
                <div key={idx} className="tl-row">
                  <div className="tl-year-col">
                    <span className="tl-year">{exp.year}</span>
                  </div>
                  <div className="tl-content-col">
                    <h3 className="tl-title">{exp.role}</h3>
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
