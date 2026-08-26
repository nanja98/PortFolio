import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Security.css";
import Navbar from "../components/Navbar";
import securityData from "../data/security.json";
import { generateCV } from "../utils/generateCV";
import { useLanguage } from "../context/LanguageContext";

const Security = () => {
  const { lang } = useLanguage();
  const data = securityData[lang] || securityData.fr;

  const { header, owaspTop10, securityChecklist } = data;

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
            <span className="section-tag">{lang === "fr" ? "Cyber-Sécurité Web & OWASP" : "Web Cyber-Security & OWASP"}</span>
            <h1 className="section-title">{header.title}</h1>
            <p className="section-subtitle">{header.subtitle}</p>
          </div>

          {/* Interactive OWASP Top 10 Showcase */}
          <div className="owasp-showcase reveal d1">
            <h2 className="section-heading">
              {lang === "fr" ? "Mitigation des vulnérabilités OWASP Top 10" : "OWASP Top 10 Vulnerability Mitigation"}
            </h2>
            
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
                    <span className={`owasp-badge ${item.risk === "Critique" || item.risk === "Critical" ? "danger" : "warning"}`}>
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
                  <h4>⚠️ {lang === "fr" ? "Menace / Risque" : "Threat / Risk"}</h4>
                  <p>{owaspTop10[activeItem].description}</p>
                </div>

                <div className="details-block mitigation">
                  <h4>🛡️ {lang === "fr" ? "Stratégie de Sécurisation (Implémentée par Nanja)" : "Hardening Strategy (Engineered by Nanja)"}</h4>
                  <p>{owaspTop10[activeItem].mitigation}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Audit Checklist */}
          <div className="checklist-section reveal d2">
            <div className="checklist-header">
              <span className="section-tag">{lang === "fr" ? "Audit de Sécurité" : "Security Audit"}</span>
              <h2 className="section-heading">
                {lang === "fr" ? "Checklist de Sécurisation d'une Application Web" : "Web Application Hardening Checklist"}
              </h2>
              <p className="checklist-subtitle">
                {lang === "fr"
                  ? "Standards appliqués par Nanja sur chaque projet pour garantir zéro vulnérabilité critique."
                  : "Standards enforced by Nanja on every engineering project to eliminate critical vulnerabilities."}
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
            <h3>
              {lang === "fr"
                ? "Besoin de sécuriser votre application web ou d'un audit OWASP ?"
                : "Need to secure your web application or an OWASP audit?"}
            </h3>
            <p>
              {lang === "fr"
                ? "Je vous accompagne dans l'architecture sécurisée, la revue de code et la correction des failles."
                : "I assist you with secure architecture, code reviews, and vulnerability remediation."}
            </p>
            <div className="security-cta-actions">
              <Link to="/contact" className="btn-primary">
                {lang === "fr" ? "Demander un audit / projet" : "Request an Audit / Project"}
              </Link>
              <button onClick={() => generateCV(lang)} className="btn-outline">
                {lang === "fr" ? "Télécharger mon CV d'Ingénieur (ATS)" : "Download Engineer CV (ATS)"}
              </button>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Security;
