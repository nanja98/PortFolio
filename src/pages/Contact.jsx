import React, { useState } from "react";
import "../styles/Contact.css";
import Navbar from "../components/Navbar";
import contactData from "../data/contact.json";

// SVG icons keyed by social type
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

const Contact = () => {
  const { header, availability, socials } = contactData;
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
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
            <span className="section-tag">Contact</span>
            <h1 className="contact-title gradient-text">{header.title}</h1>
            <p className="contact-subtitle">{header.subtitle}</p>
          </div>

          <div className="contact-layout">

            {/* ── Info panel ── */}
            <div className="contact-info reveal-left d1">
              <h2 className="info-heading">Me retrouver sur</h2>

              <div className="socials-list">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="social-item"
                  >
                    <div className="social-icon">{icons[s.type]}</div>
                    <div className="social-text">
                      <span className="social-label">{s.label}</span>
                      <span className="social-handle">{s.handle}</span>
                    </div>
                    <svg className="social-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </a>
                ))}
              </div>

              <div className="availability-card">
                <div className="avail-dot" />
                <div>
                  <strong>{availability.label}</strong>
                  <span>{availability.detail}</span>
                </div>
              </div>
            </div>

            {/* ── Form ── */}
            <div className="contact-form-wrapper reveal-right d2">
              {sent ? (
                <div className="form-success">
                  <div className="success-icon">✓</div>
                  <h3>Message envoyé !</h3>
                  <p>Je vous répondrai dans les plus brefs délais.</p>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">Votre nom</label>
                      <input id="name" type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Jean Dupont" required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input id="email" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="jean@exemple.com" required />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="subject">Sujet</label>
                    <input id="subject" type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="Proposition de projet..." />
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea id="message" name="message" rows="5" value={formData.message} onChange={handleChange} placeholder="Décrivez votre projet ou votre demande..." required></textarea>
                  </div>
                  <button type="submit" className="btn-primary form-submit">
                    Envoyer le message
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
