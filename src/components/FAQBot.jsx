import React, { useState, useEffect, useRef } from "react";
import "../styles/FAQBot.css";
import faqData from "../data/faqBot.json";
import { useLanguage } from "../context/LanguageContext";

const FAQBot = () => {
  const { lang } = useLanguage();
  const data = faqData[lang] || faqData.fr;

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  // Initialize bot welcome message when language changes or opened
  useEffect(() => {
    setMessages([
      { sender: "bot", text: data.welcome, id: 1 }
    ]);
  }, [lang, data.welcome]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const findAnswer = (query) => {
    const q = query.toLowerCase();
    if (q.includes("compétence") || q.includes("skill") || q.includes("stack") || q.includes("techno")) {
      return data.answers.skills;
    }
    if (q.includes("diplôme") || q.includes("degree") || q.includes("formation") || q.includes("ispm") || q.includes("étude")) {
      return data.answers.degree;
    }
    if (q.includes("freelance") || q.includes("remote") || q.includes("disponib") || q.includes("hire") || q.includes("recrute")) {
      return data.answers.freelance;
    }
    if (q.includes("audit") || q.includes("owasp") || q.includes("devis") || q.includes("tarif") || q.includes("prix") || q.includes("quote") || q.includes("contact")) {
      return data.answers.audit;
    }
    return data.answers.default;
  };

  const handleSend = (textToSend) => {
    const text = textToSend || input.trim();
    if (!text) return;

    // Add User Message
    const userMsg = { sender: "user", text, id: Date.now() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate Bot thinking & typing
    setTimeout(() => {
      const botResponse = findAnswer(text);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: botResponse, id: Date.now() + 1 }
      ]);
      setIsTyping(false);
    }, 600);
  };

  const handleQuickClick = (question) => {
    handleSend(question);
  };

  return (
    <div className="faq-bot-wrapper">
      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`faq-trigger-btn ${isOpen ? "active" : ""}`}
        aria-label="Assistant virtuel Nanja"
        title={lang === "fr" ? "Assistant d'Ingénieur Nanja" : "Nanja Engineer Assistant"}
      >
        <span className="faq-trigger-icon">💬</span>
        <span className="faq-trigger-text">
          {isOpen ? (lang === "fr" ? "Fermer" : "Close") : (lang === "fr" ? "Assistant FAQ" : "FAQ Bot")}
        </span>
      </button>

      {/* Chat Drawer Window */}
      {isOpen && (
        <div className="faq-chat-window">
          {/* Header */}
          <div className="faq-chat-header">
            <div className="faq-header-info">
              <div className="faq-avatar">NR</div>
              <div>
                <h4 className="faq-bot-name">Assistant Nanja</h4>
                <span className="faq-bot-status">● {lang === "fr" ? "Ingénieur Web Bot" : "Engineer Web Bot"}</span>
              </div>
            </div>
            <button className="faq-close-btn" onClick={() => setIsOpen(false)}>✕</button>
          </div>

          {/* Messages Body */}
          <div className="faq-chat-body">
            {messages.map((msg) => (
              <div key={msg.id} className={`faq-msg ${msg.sender}`}>
                <div className="faq-msg-bubble">
                  {msg.text.split("**").map((part, i) =>
                    i % 2 === 1 ? <strong key={i}>{part}</strong> : part
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="faq-msg bot">
                <div className="faq-msg-bubble typing-dots">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Suggestions Chips */}
          <div className="faq-quick-chips">
            {data.quickQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleQuickClick(q)}
                className="faq-chip"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="faq-chat-form"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={data.placeholder}
              className="faq-chat-input"
            />
            <button type="submit" className="faq-send-btn" aria-label="Envoyer">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default FAQBot;
