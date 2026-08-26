import React, { useState, useEffect, useRef } from "react";
import "../styles/FAQBot.css";
import faqData from "../data/faqBot.json";
import { useLanguage } from "../context/LanguageContext";
import { generateAIResponse } from "../utils/aiEngine";

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

  const handleSend = (textToSend) => {
    const text = textToSend || input.trim();
    if (!text) return;

    // Add User Message
    const userMsg = { sender: "user", text, id: Date.now() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate Generative AI Processing & Response Generation
    setTimeout(() => {
      const botResponse = generateAIResponse(text, lang);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: botResponse, id: Date.now() + 1 }
      ]);
      setIsTyping(false);
    }, 450);
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
        aria-label="Assistant IA Nanja"
        title={lang === "fr" ? "Assistant IA Nanja" : "Nanja AI Assistant"}
      >
        <span className="faq-trigger-icon">✨</span>
        <span className="faq-trigger-text">
          {isOpen ? (lang === "fr" ? "Fermer" : "Close") : (lang === "fr" ? "Assistant IA" : "AI Assistant")}
        </span>
      </button>

      {/* Chat Drawer Window */}
      {isOpen && (
        <div className="faq-chat-window">
          {/* Header */}
          <div className="faq-chat-header">
            <div className="faq-header-info">
              <div className="faq-avatar">AI</div>
              <div>
                <h4 className="faq-bot-name">Nanja AI Agent</h4>
                <span className="faq-bot-status">
                  <span className="online-dot" /> {lang === "fr" ? "IA d'Ingénieur Active" : "Engineer AI Active"}
                </span>
              </div>
            </div>
            <button className="faq-close-btn" onClick={() => setIsOpen(false)}>✕</button>
          </div>

          {/* Messages Body */}
          <div className="faq-chat-body">
            {messages.map((msg) => (
              <div key={msg.id} className={`faq-msg ${msg.sender}`}>
                <div className="faq-msg-bubble">
                  {msg.text.split("\n").map((line, lineIdx) => (
                    <p key={lineIdx} style={{ margin: lineIdx > 0 ? "4px 0 0" : "0" }}>
                      {line.split("**").map((part, i) =>
                        i % 2 === 1 ? <strong key={i}>{part}</strong> : part
                      )}
                    </p>
                  ))}
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
