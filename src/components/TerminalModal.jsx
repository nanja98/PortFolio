import React, { useState, useEffect, useRef } from "react";
import "../styles/TerminalModal.css";
import { useLanguage } from "../context/LanguageContext";

const TerminalModal = ({ isOpen, onClose, toggleTheme, currentTheme }) => {
  const { lang, setLang } = useLanguage();
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef(null);
  const terminalEndRef = useRef(null);

  // Initial welcome message
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    const welcome = lang === "fr"
      ? [
          "--------------------------------------------------",
          "  Nanja CLI Terminal v1.0.4 - Interactive Shell",
          "  Tapez 'help' ou 'aide' pour voir les commandes.",
          "--------------------------------------------------",
        ]
      : [
          "--------------------------------------------------",
          "  Nanja CLI Terminal v1.0.4 - Interactive Shell",
          "  Type 'help' to list available commands.",
          "--------------------------------------------------",
        ];
    setHistory(welcome.map(text => ({ type: "system", text })));
  }, [lang]);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    const newHistory = [...history, { type: "input", text: `$ ${trimmed}` }];
    const cmd = trimmed.toLowerCase();

    // Track command history for up/down arrows
    setCmdHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    if (cmd === "clear" || cmd === "cls") {
      setHistory([]);
      setInput("");
      return;
    }

    if (cmd === "help" || cmd === "aide") {
      const helpTexts = lang === "fr"
        ? [
            "Commandes disponibles :",
            "  whoami       : Profil & diplôme d'ingénieur",
            "  skills       : Stack technique & sécurité",
            "  audit        : Lancer un scan de sécurité OWASP (Simulation)",
            "  contact      : Afficher email et téléphone",
            "  theme        : Basculer le thème (dark / light)",
            "  lang [fr/en] : Changer la langue du portfolio",
            "  clear        : Effacer le terminal",
            "  exit / close : Fermer le terminal CLI",
          ]
        : [
            "Available commands:",
            "  whoami       : Engineer profile & degree",
            "  skills       : Tech & security stack",
            "  audit        : Run OWASP security audit (Simulation)",
            "  contact      : Show email and phone number",
            "  theme        : Toggle dark / light theme",
            "  lang [fr/en] : Switch portfolio language",
            "  clear        : Clear terminal screen",
            "  exit / close : Close CLI terminal",
          ];
      helpTexts.forEach((t) => newHistory.push({ type: "output", text: t }));
    } else if (cmd === "whoami") {
      const info = lang === "fr"
        ? [
            "Nanja RANDRIAMALALA",
            "• Ingénieur Développeur Web Full Stack & Sécurité",
            "• Diplômé de l'ISPM (Master 2 en Informatique)",
            "• Spécialité : React, Node.js, OWASP ASVS compliance & Hardening API",
            "• Localisation : Antananarivo, Madagascar (Remote)",
          ]
        : [
            "Nanja RANDRIAMALALA",
            "• Full Stack Web & Security Engineer",
            "• ISPM Graduate (Master 2 in Computer Science)",
            "• Specialty: React, Node.js, OWASP ASVS compliance & API Hardening",
            "• Location: Antananarivo, Madagascar (Remote)",
          ];
      info.forEach((t) => newHistory.push({ type: "output", text: t }));
    } else if (cmd === "skills" || cmd === "competences") {
      const skills = [
        "Frontend  : React, JavaScript (ES6+), HTML5, CSS3, Vite",
        "Backend   : Node.js, Express, REST APIs, GraphQL, JWT Auth",
        "Security  : OWASP Top 10, ASVS, Input Sanitization, Helmet.js, Rate Limiting",
        "Databases : PostgreSQL, MongoDB, MySQL",
        "DevOps    : Git, Docker, CI/CD pipelines",
      ];
      skills.forEach((t) => newHistory.push({ type: "output", text: t }));
    } else if (cmd === "audit") {
      const auditLog = [
        "[+] Initialisation du scan OWASP ASVS v4.0...",
        "[✓] Injection SQL & NoSQL : Protégé (100% Prepared Statements)",
        "[✓] Cross-Site Scripting (XSS) : Protégé (Sanitizer Active)",
        "[✓] Broken Access Control : Validé (RBAC Middleware)",
        "[✓] Security Headers : Enforced (Content-Security-Policy & Strict-Transport-Security)",
        "[✓] Résultat : Score de Sécurité 100/100 (Aucune faille critique trouvée)",
      ];
      auditLog.forEach((t) => newHistory.push({ type: "success", text: t }));
    } else if (cmd === "contact") {
      const contactInfo = [
        "📧 Email : nanjarandriamalala98@gmail.com",
        "📞 Tel   : +261 34 54 264 33",
        "💼 LinkedIn: linkedin.com/in/nanja98",
        "💻 GitHub  : github.com/nanja98",
      ];
      contactInfo.forEach((t) => newHistory.push({ type: "output", text: t }));
    } else if (cmd === "theme") {
      toggleTheme();
      newHistory.push({
        type: "success",
        text: `Thème basculé vers : ${currentTheme === "dark" ? "Light" : "Dark"}`,
      });
    } else if (cmd.startsWith("lang")) {
      const arg = cmd.split(" ")[1];
      if (arg === "en" || arg === "fr") {
        setLang(arg);
        newHistory.push({ type: "success", text: `Language changed to: ${arg.toUpperCase()}` });
      } else {
        newHistory.push({ type: "error", text: "Usage: lang fr OR lang en" });
      }
    } else if (cmd === "exit" || cmd === "close") {
      onClose();
      setInput("");
      return;
    } else {
      newHistory.push({
        type: "error",
        text: lang === "fr"
          ? `Commande non reconnue: '${input}'. Tapez 'help' pour la liste.`
          : `Command not found: '${input}'. Type 'help' for available commands.`,
      });
    }

    setHistory(newHistory);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length > 0) {
        const nextIndex = historyIndex < cmdHistory.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(nextIndex);
        setInput(cmdHistory[cmdHistory.length - 1 - nextIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIndex = historyIndex - 1;
        setHistoryIndex(nextIndex);
        setInput(cmdHistory[cmdHistory.length - 1 - nextIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput("");
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="terminal-overlay" onClick={onClose}>
      <div className="terminal-window" onClick={(e) => e.stopPropagation()}>
        {/* Terminal Header */}
        <div className="terminal-header">
          <div className="terminal-dots">
            <span className="dot dot-close" onClick={onClose} title="Fermer" />
            <span className="dot dot-min" />
            <span className="dot dot-max" />
          </div>
          <span className="terminal-title">nanja@engineer-shell:~</span>
          <button className="terminal-close-btn" onClick={onClose}>✕</button>
        </div>

        {/* Terminal Body */}
        <div className="terminal-body">
          {history.map((item, idx) => (
            <div key={idx} className={`terminal-line ${item.type}`}>
              {item.text}
            </div>
          ))}

          {/* Interactive Prompt Form */}
          <form onSubmit={handleCommand} className="terminal-form">
            <span className="prompt-symbol">$</span>
            <input
              ref={inputRef}
              type="text"
              className="terminal-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              spellCheck="false"
              autoComplete="off"
            />
          </form>
          <div ref={terminalEndRef} />
        </div>
      </div>
    </div>
  );
};

export default TerminalModal;
