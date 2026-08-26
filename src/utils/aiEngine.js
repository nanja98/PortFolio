// Nanja AI Assistant Engine - Semantic & Natural Intent Resolver

const KNOWLEDGE = {
  fr: {
    identity: {
      keywords: ["qui est", "présente", "qui es-tu", "bio", "profil", "nanja", "ingénieur", "présentation", "rôle"],
      response: "Nanja RANDRIAMALALA est **Ingénieur Développeur Full Stack & Sécurité Web**, diplômé d'un **Master 2 de l'ISPM**. Il est spécialisé dans la création d'applications web modernes performantes (React, Node.js) et le durcissement de la sécurité (OWASP Top 10)."
    },
    skills: {
      keywords: ["compétence", "stack", "techno", "react", "node", "javascript", "base de donnée", "db", "frontend", "backend", "langage", "outils"],
      response: "Sa stack principale comprend :\n- **Frontend** : React.js, JavaScript ES6+, HTML5, CSS3, Vite\n- **Backend** : Node.js, Express, APIs REST & GraphQL, JWT Auth\n- **Base de données** : PostgreSQL, MongoDB, MySQL\n- **Sécurité & DevOps** : Normes OWASP ASVS, Docker, Git, CI/CD"
    },
    security: {
      keywords: ["sécurité", "owasp", "audit", "faille", "hack", "xss", "sqli", "injection", "durcissement", "protection", "vulnerab"],
      response: "En matière de **Cyber-Sécurité Web**, Nanja applique le standard **OWASP ASVS v4.0** :\n- Protection contre les injections SQL et failles XSS\n- Limitation de débit (Rate Limiting) anti force-brute\n- Stockage des tokens JWT en cookies HttpOnly sécurisés\n- Configuration stricte des en-têtes CSP & HSTS"
    },
    education: {
      keywords: ["diplôme", "diplome", "ispm", "master", "étude", "etude", "école", "ecole", "université", "formation", "niveau"],
      response: "Nanja possède un **Diplôme d'Ingénieur (Master 2 en Informatique)** délivré par l'**ISPM** (Institut Supérieur Polytechnique de Madagascar), attestant d'une rigueur scientifique et technique avancée."
    },
    availability: {
      keywords: ["dispo", "remote", "freelance", "recrut", "embauche", "contrat", "mission", "international", "télétravail", "tarif", "devis", "prix"],
      response: "Nanja est **100% disponible pour des contrats Freelance ou opportunités d'Ingénieur en Remote à l'international** (Europe, Amérique, Worldwide). Il intervient sur des projets clients 2025-2026."
    },
    contact: {
      keywords: ["contact", "email", "mail", "téléphone", "phone", "joindre", "écrire", "message", "linkedin", "github"],
      response: "Vous pouvez contacter directement Nanja :\n- 📧 **Email** : nanjarandriamalala98@gmail.com\n- 📞 **Téléphone** : +261 34 54 264 33\n- 💼 **LinkedIn** : linkedin.com/in/nanja98\n- 💻 **GitHub** : github.com/nanja98"
    },
    cv: {
      keywords: ["cv", "resume", "pdf", "télécharger", "download", "ats"],
      response: "Vous pouvez télécharger son **CV conforme aux logiciels de recrutement ATS** directement via le bouton **'CV ATS'** dans la barre de navigation en haut de page !"
    },
    projects: {
      keywords: ["projet", "portfolio", "réalisation", "realisation", "client", "expérienc", "travaux"],
      response: "Nanja a conçu des applications web pour des clients internationaux (2025-2026) allant de plateformes SaaS sécurisées aux tableaux de bord analytiques et systèmes d'audit de sécurité."
    },
    greeting: {
      keywords: ["bonjour", "salut", "hello", "hi", "coucou", "yo", "ça va", "bonsoir"],
      response: "Bonjour ! Je suis l'**IA d'Assistance de Nanja**. Comment puis-je vous aider aujourd'hui ? Vous pouvez me poser des questions sur son profil d'ingénieur, ses compétences, ses projets ou sa sécurité OWASP !"
    },
    thanks: {
      keywords: ["merci", "thanks", "super", "parfait", "excellent", "top"],
      response: "Avec plaisir ! N'hésitez pas si vous avez d'autres questions ou si vous souhaitez contacter Nanja directement."
    }
  },
  en: {
    identity: {
      keywords: ["who is", "who are you", "bio", "profile", "nanja", "engineer", "about", "role"],
      response: "Nanja RANDRIAMALALA is a **Full Stack Web & Security Engineer**, holding a **Master 2 Engineer Degree from ISPM**. He specializes in modern web applications (React, Node.js) and OWASP security hardening."
    },
    skills: {
      keywords: ["skill", "stack", "tech", "react", "node", "javascript", "database", "db", "frontend", "backend", "tools"],
      response: "His core tech stack includes:\n- **Frontend**: React.js, JavaScript ES6+, HTML5, CSS3, Vite\n- **Backend**: Node.js, Express, REST & GraphQL APIs, JWT Auth\n- **Databases**: PostgreSQL, MongoDB, MySQL\n- **Security & DevOps**: OWASP ASVS standards, Docker, Git, CI/CD"
    },
    security: {
      keywords: ["security", "owasp", "audit", "vulnerability", "hack", "xss", "sqli", "injection", "hardening", "protection"],
      response: "For **Web Cyber-Security**, Nanja enforces the **OWASP ASVS v4.0** standard:\n- SQL Injection & XSS sanitization\n- API Rate Limiting against brute-force attacks\n- JWT token storage via secure HttpOnly cookies\n- Strict CSP & HSTS security headers"
    },
    education: {
      keywords: ["degree", "ispm", "master", "education", "school", "university", "qualification"],
      response: "Nanja holds a **Master 2 Engineer Degree in Computer Science** from **ISPM** (Institut Supérieur Polytechnique de Madagascar), providing solid computer science fundamentals."
    },
    availability: {
      keywords: ["available", "remote", "freelance", "hire", "job", "contract", "work", "rates", "quote"],
      response: "Nanja is **available for international Freelance contracts and Remote engineering roles** worldwide for 2025–2026 client projects."
    },
    contact: {
      keywords: ["contact", "email", "mail", "phone", "reach", "message", "linkedin", "github"],
      response: "You can reach Nanja directly:\n- 📧 **Email**: nanjarandriamalala98@gmail.com\n- 📞 **Phone**: +261 34 54 264 33\n- 💼 **LinkedIn**: linkedin.com/in/nanja98\n- 💻 **GitHub**: github.com/nanja98"
    },
    cv: {
      keywords: ["cv", "resume", "pdf", "download", "ats"],
      response: "You can download his **ATS-compliant Engineer CV (PDF)** by clicking the **'CV ATS'** button in the top navigation bar!"
    },
    projects: {
      keywords: ["project", "portfolio", "work", "client", "experience", "built"],
      response: "Nanja has built high-performance web applications for international clients (2025-2026), ranging from secure SaaS platforms to analytics dashboards and security audit tools."
    },
    greeting: {
      keywords: ["hello", "hi", "hey", "greetings", "good morning", "good evening"],
      response: "Hello! I am **Nanja's AI Assistant Agent**. How can I help you today? Ask me anything about Nanja's engineering background, skills, or OWASP security expertise!"
    },
    thanks: {
      keywords: ["thank", "thanks", "great", "awesome", "perfect"],
      response: "You are welcome! Let me know if you need any more details or if you'd like to get in touch with Nanja."
    }
  }
};

export const generateAIResponse = (userPrompt, language = "fr") => {
  const lang = language === "en" ? "en" : "fr";
  const knowledgeBase = KNOWLEDGE[lang];
  const query = userPrompt.toLowerCase().trim();

  if (!query) return knowledgeBase.greeting.response;

  let bestMatch = null;
  let highestScore = 0;

  for (const key in knowledgeBase) {
    const entry = knowledgeBase[key];
    let score = 0;

    for (const keyword of entry.keywords) {
      if (query.includes(keyword)) {
        score += keyword.length > 4 ? 3 : 1;
      }
    }

    if (score > highestScore) {
      highestScore = score;
      bestMatch = entry.response;
    }
  }

  if (highestScore > 0 && bestMatch) {
    return bestMatch;
  }

  // Fallback intelligent response if query is unique
  return lang === "fr"
    ? `En tant qu'**IA d'Assistance de Nanja**, je peux vous renseigner sur ses **compétences Full Stack (React/Node.js)**, sa formation d'**Ingénieur ISPM (Master 2)**, ses audits de **Sécurité OWASP**, sa disponibilité en **Remote/Freelance**, ou vous donner ses **coordonnées**. Que souhaitez-vous savoir ?`
    : `As **Nanja's AI Assistant Agent**, I can tell you about his **Full Stack skills (React/Node.js)**, **ISPM Master 2 Engineer Degree**, **OWASP Security audits**, **Remote/Freelance availability**, or **contact info**. What would you like to know?`;
};
