import React from "react";
import "../styles/Projet.css";
import Navbar from "../components/Navbar";
import projectsData from "../data/projects.json";
import LogoMEDD from "../images/LogoMEDD.png";
import LogoCidst from "../images/LogoCidst.png";

const imageMap = {
  LogoMEDD: LogoMEDD,
  LogoCidst: LogoCidst,
};

const Projects = () => {
  const { header, cta, projects } = projectsData;

  return (
    <div className="page">
      <Navbar />
      <section className="projects-section">
        <div className="container">

          {/* Header */}
          <div className="projects-header reveal">
            <span className="section-tag">Réalisations & Portfolio</span>
            <h1 className="section-title">{header.title}</h1>
            <p className="section-subtitle">{header.subtitle}</p>
          </div>

          {/* Grid */}
          <div className="projects-grid">
            {projects.map((p, idx) => {
              const imgSrc = p.image ? imageMap[p.image] : null;

              return (
                <div key={p.id} className={`project-card reveal d${idx + 1}`}>
                  <div className="project-header">
                    <span className="project-org">{p.org}</span>
                    {p.featured && <span className="featured-badge">Ingénierie Clé</span>}
                  </div>

                  <h3 className="project-title">{p.title}</h3>
                  <p className="project-desc">{p.description}</p>

                  {imgSrc && (
                    <div className="project-image-box">
                      <img src={imgSrc} alt={p.title} />
                    </div>
                  )}

                  <div className="project-tech-list">
                    {p.tech.map((t) => (
                      <span key={t} className="project-tech-tag">{t}</span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA Card */}
          <div className="projects-cta-card reveal d4">
            <h3>{cta.text}</h3>
            <a href={cta.to} className="btn-primary">
              {cta.label}
            </a>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Projects;
