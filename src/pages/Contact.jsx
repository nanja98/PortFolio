import React, { useState } from "react";
import "../styles/Contact.css";
import Navbar from "../components/Navbar";
import contactData from "../data/contact.json";
import { useLanguage } from "../context/LanguageContext";

const icons = {
  linkedin: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  ),
  github: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
    </svg>
  ),
  email: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  ),
  phone: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.022 2.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
    </svg>
  ),
};

// Input Sanitizer helper to prevent XSS Attacks
const sanitizeInput = (str) => {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
};

const Contact = () => {
  const { lang } = useLanguage();
  const data = contactData[lang] || contactData.fr;

  const { header, info, form } = data;

  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [lastSubmitTime, setLastSubmitTime] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setErrorMessage("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Client-side Rate Limiting Protection (Prevent Spam Bots)
    const now = Date.now();
    if (now - lastSubmitTime < 10000) {
      setErrorMessage(
        lang === "fr"
          ? "Veuillez patienter quelques secondes avant d'envoyer un autre message."
          : "Please wait a few seconds before sending another message."
      );
      return;
    }

    // Sanitize all form fields before processing
    const cleanData = {
      name: sanitizeInput(formData.name),
      email: sanitizeInput(formData.email),
      subject: sanitizeInput(formData.subject),
      message: sanitizeInput(formData.message),
    };

    console.log("Secure sanitized submission payload:", cleanData);
    setLastSubmitTime(now);
    setSent(true);

    setTimeout(() => {
      setSent(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 4000);
  };

  return (
    <div className="page">
      <Navbar />
      <section className="contact-section">
        <div className="container">

          <div className="contact-header reveal">
            <span className="section-tag">{lang === "fr" ? "Contact Sécurisé" : "Secure Contact"}</span>
            <h1 className="section-title">{header.title}</h1>
            <p className="section-subtitle">{header.subtitle}</p>
          </div>

          <div className="contact-layout">

            {/* Info panel */}
            <div className="contact-info reveal d1">
              <h2 className="info-heading">{lang === "fr" ? "Informations & Réseaux" : "Contact Info & Profiles"}</h2>

              <div className="socials-list">
                {info.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-item"
                  >
                    <div className="social-icon">{icons[item.type] || item.icon}</div>
                    <div className="social-text">
                      <span className="social-label">{item.label}</span>
                      <span className="social-handle">{item.value}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="contact-form-wrapper reveal d2">
              {sent ? (
                <div className="form-success">
                  <div className="success-icon">✓</div>
                  <h3>{lang === "fr" ? "Message envoyé !" : "Message sent!"}</h3>
                  <p>{lang === "fr" ? "Je vous répondrai dans les plus brefs délais." : "I will reply to you as soon as possible."}</p>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  {errorMessage && <div className="error-banner" style={{ color: "#ef4444", fontSize: "13px" }}>{errorMessage}</div>}
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">{form.name}</label>
                      <input id="name" type="text" name="name" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">{form.email}</label>
                      <input id="email" type="email" name="email" value={formData.email} onChange={handleChange} required />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="subject">{form.subject}</label>
                    <input id="subject" type="text" name="subject" value={formData.subject} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">{form.message}</label>
                    <textarea id="message" name="message" rows="5" value={formData.message} onChange={handleChange} required></textarea>
                  </div>
                  <button type="submit" className="btn-primary form-submit">
                    {form.submit}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="22" y1="2" x2="11" y2="13"/>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                    </svg>
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
