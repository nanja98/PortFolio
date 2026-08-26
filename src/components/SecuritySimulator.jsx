import React, { useState } from "react";
import "../styles/SecuritySimulator.css";
import { useLanguage } from "../context/LanguageContext";

const SecuritySimulator = () => {
  const { lang } = useLanguage();

  const [controls, setControls] = useState({
    rateLimit: true,
    jwtSecurity: true,
    sanitization: true,
    cspHeaders: true,
  });

  const [testResult, setTestResult] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);

  const toggleControl = (key) => {
    setControls((prev) => ({ ...prev, [key]: !prev[key] }));
    setTestResult(null);
  };

  // Calculate score based on enabled security features
  const activeCount = Object.values(controls).filter(Boolean).length;
  const score = activeCount * 25;

  const getScoreColor = () => {
    if (score === 100) return "emerald";
    if (score >= 50) return "warning";
    return "danger";
  };

  const runSimulation = () => {
    setIsSimulating(true);
    setTestResult(null);

    setTimeout(() => {
      const results = [
        {
          name: lang === "fr" ? "Test Attaque XSS Script" : "XSS Payload Attack",
          passed: controls.sanitization,
          detail: controls.sanitization
            ? (lang === "fr" ? "Bloqué par l'assainisseur d'entrée (HTML Entity Escaped)" : "Blocked by Input Sanitizer (HTML Entity Escaped)")
            : (lang === "fr" ? "⚠️ Vulnérable : Ingestion de script malveillant autorisée !" : "⚠️ Vulnerable: Malicious script injection allowed!"),
        },
        {
          name: lang === "fr" ? "Test Attaque Brute-Force Auth" : "Brute-Force Auth Attack",
          passed: controls.rateLimit,
          detail: controls.rateLimit
            ? (lang === "fr" ? "Bloqué après 5 essais (HTTP 429 Too Many Requests)" : "Blocked after 5 attempts (HTTP 429 Too Many Requests)")
            : (lang === "fr" ? "⚠️ Vulnérable : Attaque par dictionnaire illimitée !" : "⚠️ Vulnerable: Unlimited dictionary attack possible!"),
        },
        {
          name: lang === "fr" ? "Test Altération de Token JWT" : "JWT Token Tampering Test",
          passed: controls.jwtSecurity,
          detail: controls.jwtSecurity
            ? (lang === "fr" ? "Refusé : Cookie HttpOnly & Signature HMAC-SHA256 valide" : "Denied: HttpOnly Cookie & Valid HMAC-SHA256 Signature")
            : (lang === "fr" ? "⚠️ Vulnérable : Token stocké en LocalStorage réutilisable !" : "⚠️ Vulnerable: Reusable token stored in LocalStorage!"),
        },
        {
          name: lang === "fr" ? "Test Injection Header / Clickjacking" : "Clickjacking / Header Test",
          passed: controls.cspHeaders,
          detail: controls.cspHeaders
            ? (lang === "fr" ? "Protégé : En-têtes HSTS & Content-Security-Policy strictes" : "Protected: Strict HSTS & Content-Security-Policy Headers")
            : (lang === "fr" ? "⚠️ Vulnérable : iframe non restreinte !" : "⚠️ Vulnerable: Unrestricted iframe embedding!"),
        },
      ];

      setIsSimulating(false);
      setTestResult(results);
    }, 800);
  };

  return (
    <div className="sim-container">
      <div className="sim-header">
        <div>
          <span className="sim-badge">
            {lang === "fr" ? "Simulateur Interactif de Sécurisation" : "Interactive Hardening Simulator"}
          </span>
          <h3 className="sim-title">
            {lang === "fr" ? "Laboratoire de Sécurité Web d'Ingénieur" : "Engineer Web Security Lab"}
          </h3>
          <p className="sim-subtitle">
            {lang === "fr"
              ? "Activez ou désactivez les protections pour simuler l'attaque d'une application web en temps réel."
              : "Toggle security shields to simulate web application attack vulnerability in real-time."}
          </p>
        </div>

        {/* Live Score Display */}
        <div className={`sim-score-box ${getScoreColor()}`}>
          <div className="score-value">{score}%</div>
          <div className="score-label">
            {score === 100
              ? (lang === "fr" ? "Sécurisé (OWASP)" : "Hardened (OWASP)")
              : score >= 50
              ? (lang === "fr" ? "Risque Modéré" : "Moderate Risk")
              : (lang === "fr" ? "Critique / Vulnérable" : "Critical Risk")}
          </div>
        </div>
      </div>

      {/* Switches Grid */}
      <div className="sim-switches-grid">
        <div
          className={`sim-switch-card ${controls.sanitization ? "active" : ""}`}
          onClick={() => toggleControl("sanitization")}
        >
          <div className="switch-top">
            <span className="switch-icon">🧼</span>
            <div className={`switch-toggle ${controls.sanitization ? "on" : "off"}`}>
              <div className="toggle-thumb" />
            </div>
          </div>
          <h4>{lang === "fr" ? "Assainissement d'Entrée (XSS & SQLi)" : "Input Sanitization (XSS & SQLi)"}</h4>
          <p>{lang === "fr" ? "Filtrage strict des entrées utilisateur & requêtes préparées SQL." : "Strict filtering of user inputs & SQL prepared statements."}</p>
        </div>

        <div
          className={`sim-switch-card ${controls.rateLimit ? "active" : ""}`}
          onClick={() => toggleControl("rateLimit")}
        >
          <div className="switch-top">
            <span className="switch-icon">⏳</span>
            <div className={`switch-toggle ${controls.rateLimit ? "on" : "off"}`}>
              <div className="toggle-thumb" />
            </div>
          </div>
          <h4>{lang === "fr" ? "Limitation de Débit (Rate Limiting)" : "Rate Limiting (Brute-Force)"}</h4>
          <p>{lang === "fr" ? "Protection contre les attaques par force brute sur l'API d'authentification." : "Protection against brute-force attacks on the auth API."}</p>
        </div>

        <div
          className={`sim-switch-card ${controls.jwtSecurity ? "active" : ""}`}
          onClick={() => toggleControl("jwtSecurity")}
        >
          <div className="switch-top">
            <span className="switch-icon">🔑</span>
            <div className={`switch-toggle ${controls.jwtSecurity ? "on" : "off"}`}>
              <div className="toggle-thumb" />
            </div>
          </div>
          <h4>{lang === "fr" ? "Durcissement JWT & Cookies HttpOnly" : "JWT Hardening & HttpOnly Cookies"}</h4>
          <p>{lang === "fr" ? "Expiration courte du token et stockage sécurisé anti-vol XSS." : "Short token lifetime & secure XSS-resistant storage."}</p>
        </div>

        <div
          className={`sim-switch-card ${controls.cspHeaders ? "active" : ""}`}
          onClick={() => toggleControl("cspHeaders")}
        >
          <div className="switch-top">
            <span className="switch-icon">🛡️</span>
            <div className={`switch-toggle ${controls.cspHeaders ? "on" : "off"}`}>
              <div className="toggle-thumb" />
            </div>
          </div>
          <h4>{lang === "fr" ? "En-têtes de Sécurité CSP & HSTS" : "CSP & HSTS Security Headers"}</h4>
          <p>{lang === "fr" ? "Restriction de chargement de scripts externes et HTTPS obligatoire." : "Restricted external script loading & forced HTTPS."}</p>
        </div>
      </div>

      {/* Action Button */}
      <div className="sim-action-row">
        <button
          onClick={runSimulation}
          className="btn-primary sim-run-btn"
          disabled={isSimulating}
        >
          {isSimulating ? (
            <>
              <span className="sim-spinner" />
              {lang === "fr" ? "Simulation d'attaque en cours..." : "Simulating cyber attack..."}
            </>
          ) : (
            <>
              🚀 {lang === "fr" ? "Tester la Résistance de l'Application" : "Simulate Cyber Attack Test"}
            </>
          )}
        </button>
      </div>

      {/* Test Results Output */}
      {testResult && (
        <div className="sim-results-box">
          <h4 className="results-title">
            {lang === "fr" ? "Rapport de Simulation d'Attaque :" : "Attack Simulation Report:"}
          </h4>
          <div className="results-list">
            {testResult.map((res, idx) => (
              <div key={idx} className={`result-item ${res.passed ? "passed" : "failed"}`}>
                <div className="result-status">
                  {res.passed ? "✓ PASS" : "✕ FAIL"}
                </div>
                <div className="result-details">
                  <strong>{res.name}</strong>
                  <span>{res.detail}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SecuritySimulator;
