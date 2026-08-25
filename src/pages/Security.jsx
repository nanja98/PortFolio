import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Security.css";
import Navbar from "../components/Navbar";
import securityData from "../data/security.json";
import { generateCV } from "../utils/generateCV";

const Security = () => {
  const { header, owaspTop10, securityChecklist } = securityData;
  const [activeItem, setActiveItem] = useState(0);
  const [checkedItems, setCheckedItems] = useState({});

  const toggleCheck = (idx) => {
    setCheckedItems((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div className="page">
      <Navbar />
      <section className="security-page-section">
        <div className="container">

          {/* Header */}
          <div className="security-page-header reveal">
            <span className="section-tag">Cyber-Sécurité Web & OWASP</span>
            <h1 className="security-page-title gradient-text">{header.title}</h1>
            <p className="security-page-subtitle">{header.subtitle}</p>
          </div>

          {/* Interactive OWASP Top 10 Showcase */}
          <div className="owasp-showcase reveal d1">
            <h2 className="section-heading">Mitigation des vulnérabilités OWASP Top 10</h2>
            
            <div className="owasp-layout">
              {/* Left sidebar: Code list */}
              <div className="owasp-list">
                {owaspTop10.map((item, idx) => (
                  <button
                    key={item.code}
                    className={`owasp-btn ${activeItem === idx ? "active" : ""}`}
                    onClick={() => setActiveItem(idx)}
                  >
                    <span className="owasp-code">{item.code}</span>
                    <span className="owasp-name">{item.title}</span>
                    <span className={`owasp-badge ${item.risk === "Critique" ? "danger" : "warning"}`}>
                      {item.risk}
                    </span>
                  </button>
                ))}
              </div>

              {/* Right panel: Details & Mitigation strategy */}
              <div className="owasp-details">
                <div className="details-header">
                  <span className="details-code">{owaspTop10[activeItem].code}</span>
                  <h3 className="details-title">{owaspTop10[activeItem].title}</h3>
                </div>

                <div className="details-block">
                  <h4>⚠️ Menace / Risque</h4>
                  <p>{owaspTop10[activeItem].description}</p>
                </div>

                <div className="details-block mitigation">
                  <h4>🛡️ Stratégie de Sécurisation (Implémentée par Nanja)</h4>
                  <p>{owaspTop10[activeItem].mitigation}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Audit Checklist */}
          <div className="checklist-section reveal d2">
            <div className="checklist-header">
              <span className="section-tag">Audit de Sécurité</span>
              <h2 className="section-heading">Checklist de Sécurisation d'une Application Web</h2>
              <p className="checklist-subtitle">
                Standards appliqués par Nanja sur chaque projet pour garantir zéro vulnérabilité critique.
              </p>
            </div>

            <div className="checklist-grid">
              {securityChecklist.map((item, idx) => (
                <div
                  key={idx}
                  className={`checklist-card ${checkedItems[idx] ? "completed" : ""}`}
                  onClick={() => toggleCheck(idx)}
                >
                  <div className="checkbox">
                    {checkedItems[idx] ? "✓" : ""}
                  </div>
                  <div className="checklist-info">
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Box */}
          <div className="security-cta reveal d3">
            <h3>Besoin de sécuriser votre application web ou d'un audit OWASP ?</h3>
            <p>
              Je vous accompagne dans l'architecture sécurisée, la revue de code et la correction des failles.
            </p>
            <div className="security-cta-actions">
              <Link to="/contact" className="btn-primary">Demander un audit / projet</Link>
              <button onClick={generateCV} className="btn-outline">Télécharger mon CV d'Ingénieur (ATS)</button>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Security;
