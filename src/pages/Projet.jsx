import React from "react";
import { Link } from "react-router-dom";
import "../styles/Projet.css";
import Navbar from "../components/Navbar";
import LogoMedd from "../images/LogoMEDD.png";
import LogoCidst from "../images/LogoCidst.png";
import projectsData from "../data/projects.json";

// Map image keys from JSON to actual imported assets
const imageMap = {
  LogoMEDD: LogoMedd,
  LogoCidst: LogoCidst,
};

const Projects = () => {
  const { header, cta, projects } = projectsData;

  return (
    <div className="page">
      <Navbar />
      <section className="projects-section">
        <div className="container">

          <div className="projects-header reveal">
            <span className="section-tag">Projets</span>
            <h1 className="projects-title gradient-text">{header.title}</h1>
            <p className="projects-subtitle">{header.subtitle}</p>
          </div>

          <div className="projects-grid">
            {projects.map((project, i) => (
              <article
                key={project.id}
                className={`project-card reveal d${i + 1} ${project.featured ? "featured" : ""}`}
              >
                <div className="card-image-wrapper">
                  {imageMap[project.image] ? (
                    <img
                      src={imageMap[project.image]}
                      alt={project.title}
                      className="card-img"
                    />
                  ) : (
                    <div className="card-img-placeholder">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <rect x="3" y="3" width="18" height="18" rx="2"/>
                        <path d="M3 9h18M9 21V9"/>
                      </svg>
                    </div>
                  )}
                  {project.featured && (
                    <span className="card-featured-badge">⭐ Projet phare</span>
                  )}
                </div>

                <div className="card-body">
                  <div className="card-meta">
                    <span className="card-org">{project.org}</span>
                  </div>
                  <h3 className="card-title">{project.title}</h3>
                  <p className="card-desc">{project.description}</p>

                  <div className="card-tech">
                    {project.tech.map((t) => (
                      <span key={t} className="tech-badge">{t}</span>
                    ))}
                  </div>

                  <div className="card-actions">
                    <a
                      href={project.link}
                      className="btn-primary"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Voir le projet
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="projects-cta reveal">
            <p>{cta.text}</p>
            <Link to={cta.to} className="btn-primary">{cta.label}</Link>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Projects;
