// Nanja Advanced AI Agent Engine - Deep Knowledge Base & Robust Accent-Insensitive NLP Token Matcher

// Accent & punctuation stripper helper function
const normalizeText = (str) => {
  if (!str) return "";
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove accents (é -> e, è -> e, à -> a, etc.)
    .replace(/[^a-z0-9\s]/g, " ")   // replace special chars with space
    .trim();
};

const KNOWLEDGE = {
  fr: {
    contact: {
      keywords: ["coordonnee", "coordonnees", "coordonne", "coordonnes", "contact", "contacter", "email", "mail", "téléphone", "telephone", "phone", "tel", "joindre", "ecrire", "écrire", "message", "linkedin", "github", "numéro", "numero"],
      response: "Vous pouvez contacter Nanja directement via ses coordonnées :\n- 📧 **Email** : nanjarandriamalala98@gmail.com\n- 📞 **Téléphone** : +261 34 54 264 33\n- 💼 **LinkedIn** : linkedin.com/in/nanja98\n- 💻 **GitHub** : github.com/nanja98"
    },
    address: {
      keywords: ["adresse", "localisation", "lieu", "habite", "basé", "base", "ville", "pays", "madagascar", "antananarivo", "où", "ou", "bureau", "endroit", "siège", "siege"],
      response: "Nanja est basé à **Antananarivo, Madagascar** (Fuseau horaire UTC+3 / GMT+3). Il travaille à 100% en **Remote (Télétravail)** pour des entreprises et clients internationaux à travers le monde."
    },
    identity: {
      keywords: ["qui", "bio", "profil", "nanja", "ingénieur", "ingénieur", "présentation", "presentation", "rôle", "role"],
      response: "Nanja RANDRIAMALALA est **Ingénieur Développeur Full Stack & Sécurité Web**, diplômé d'un **Master 2 de l'ISPM**. Il cumule plus de 5 ans d'expérience en développement web haute performance (React, Node.js) et en durcissement de la sécurité (OWASP Top 10)."
    },
    skills: {
      keywords: ["compétence", "competence", "competences", "compétences", "stack", "techno", "technologie", "technologies", "react", "node", "javascript", "base", "db", "frontend", "backend", "langage", "outils", "express", "mongo", "postgres", "sql"],
      response: "Sa stack d'ingénierie comprend :\n- **Frontend** : React.js, JavaScript ES6+, HTML5, CSS3, Vite\n- **Backend** : Node.js, Express, APIs REST & GraphQL, Auth JWT\n- **Base de données** : PostgreSQL, MongoDB, MySQL\n- **Sécurité & DevOps** : Normes OWASP ASVS, Docker, Git, CI/CD"
    },
    security: {
      keywords: ["sécurité", "securite", "owasp", "audit", "faille", "hack", "xss", "sqli", "injection", "durcissement", "protection", "vulnerab", "penetration", "test"],
      response: "En matière de **Cyber-Sécurité Web**, Nanja applique le standard **OWASP ASVS v4.0** :\n- Protection contre les injections SQL et failles XSS\n- Limitation de débit (Rate Limiting) anti force-brute\n- Stockage des tokens JWT en cookies HttpOnly sécurisés\n- Configuration stricte des en-têtes CSP & HSTS"
    },
    pricing: {
      keywords: ["tarif", "tarifs", "tjm", "prix", "coût", "cout", "devis", "combien", "budget", "facture", "facturation", "taux"],
      response: "Nanja propose des tarifs adaptés selon la nature de la mission (TJM en Freelance ou forfait par projet). Pour obtenir une estimation budgétaire sous 24h, envoyez les détails de votre projet via la page **Contact** ou par email !"
    },
    timeline: {
      keywords: ["délai", "delai", "delais", "durée", "duree", "temps", "semaine", "jour", "planning", "agile", "sprint"],
      response: "Les projets sont gérés selon la méthodologie **Agile (Sprints de 1 à 2 semaines)** :\n- **Audit de sécurité OWASP** : 3 à 5 jours ouvrés\n- **Application Web Full Stack** : 2 à 6 semaines selon le cahier des charges"
    },
    languages: {
      keywords: ["langue", "langues", "parle", "anglais", "français", "francais", "english", "bilingue"],
      response: "Nanja est **bilingue (Français et Anglais)**, ce qui lui permet de collaborer de manière fluide avec des équipes et des clients internationaux."
    },
    education: {
      keywords: ["diplôme", "diplome", "diplomes", "ispm", "master", "étude", "etude", "école", "ecole", "université", "universite", "formation", "niveau"],
      response: "Nanja possède un **Diplôme d'Ingénieur (Master 2 en Informatique)** délivré par l'**ISPM** (Institut Supérieur Polytechnique de Madagascar), attestant d'une formation solide en ingénierie logicielle."
    },
    availability: {
      keywords: ["dispo", "disponibilité", "disponibilite", "remote", "freelance", "recrut", "embauche", "contrat", "mission", "international", "télétravail", "teletravail", "cherche", "disponible"],
      response: "Nanja est **disponible immédiatement pour des contrats Freelance ou postes d'Ingénieur à distance (Remote Worldwide)** pour vos projets 2025–2026."
    },
    cv: {
      keywords: ["cv", "resume", "pdf", "télécharger", "telecharger", "download", "ats", "curriculum"],
      response: "Vous pouvez télécharger son **CV conforme aux logiciels ATS** via le bouton **'CV ATS'** situé dans le menu de navigation !"
    },
    projects: {
      keywords: ["projet", "projets", "portfolio", "réalisation", "realisation", "realisations", "client", "expérienc", "travaux"],
      response: "Nanja a réalisé des applications web complexes pour des clients internationaux (SaaS sécurisés, dashboards décisionnels, architectures d'APIs et outils d'audit de sécurité)."
    },
    greeting: {
      keywords: ["bonjour", "salut", "hello", "hi", "coucou", "yo", "bonsoir", "slt"],
      response: "Bonjour ! Je suis l'**IA d'Assistance de Nanja**. Comment puis-je vous aider ? Vous pouvez me demander ses coordonnées, son adresse, son expérience, ses tarifs ou sa sécurité OWASP !"
    },
    thanks: {
      keywords: ["merci", "thanks", "super", "parfait", "excellent", "top", "génial", "genial"],
      response: "Je vous en prie ! N'hésitez pas si vous avez d'autres questions ou si vous souhaitez contacter Nanja directement."
    }
  },
  en: {
    contact: {
      keywords: ["contact", "details", "email", "mail", "phone", "reach", "message", "linkedin", "github", "number", "info"],
      response: "You can reach Nanja directly:\n- 📧 **Email**: nanjarandriamalala98@gmail.com\n- 📞 **Phone**: +261 34 54 264 33\n- 💼 **LinkedIn**: linkedin.com/in/nanja98\n- 💻 **GitHub**: github.com/nanja98"
    },
    address: {
      keywords: ["address", "location", "where", "located", "based", "city", "country", "madagascar", "antananarivo", "office", "place"],
      response: "Nanja is based in **Antananarivo, Madagascar** (Timezone UTC+3 / GMT+3). He works fluently in **Remote mode** for international companies and clients worldwide."
    },
    identity: {
      keywords: ["who", "bio", "profile", "nanja", "engineer", "about", "role"],
      response: "Nanja RANDRIAMALALA is a **Full Stack Web & Security Engineer**, holding a **Master 2 Engineer Degree from ISPM**, with 5+ years of experience in high-performance web development and OWASP security."
    },
    skills: {
      keywords: ["skill", "skills", "stack", "tech", "react", "node", "javascript", "database", "db", "frontend", "backend", "tools", "express", "mongo", "postgres"],
      response: "His core tech stack includes:\n- **Frontend**: React.js, JavaScript ES6+, HTML5, CSS3, Vite\n- **Backend**: Node.js, Express, REST & GraphQL APIs, JWT Auth\n- **Databases**: PostgreSQL, MongoDB, MySQL\n- **Security & DevOps**: OWASP ASVS standards, Docker, Git, CI/CD"
    },
    security: {
      keywords: ["security", "owasp", "audit", "vulnerability", "hack", "xss", "sqli", "injection", "hardening", "protection", "penetration"],
      response: "For **Web Cyber-Security**, Nanja enforces the **OWASP ASVS v4.0** standard:\n- SQL Injection & XSS sanitization\n- API Rate Limiting against brute-force attacks\n- JWT token storage via secure HttpOnly cookies\n- Strict CSP & HSTS security headers"
    },
    pricing: {
      keywords: ["rate", "rates", "price", "cost", "quote", "budget", "billing", "pricing", "tjm"],
      response: "Nanja offers competitive pricing tailored to project scope or daily rate (TJM). Contact him via the **Contact page** or email for a detailed quote within 24 hours!"
    },
    timeline: {
      keywords: ["timeline", "duration", "how long", "time", "sprint", "agile", "weeks", "days", "schedule"],
      response: "Projects are managed using **Agile methodology (1 to 2-week sprints)**:\n- **OWASP Security Audit**: 3 to 5 business days\n- **Full Stack Web App**: 2 to 6 weeks depending on requirements"
    },
    languages: {
      keywords: ["language", "languages", "speak", "english", "french", "bilingual", "fluency"],
      response: "Nanja is **bilingual in French and English**, making collaboration seamless with international teams."
    },
    education: {
      keywords: ["degree", "ispm", "master", "education", "school", "university", "qualification"],
      response: "Nanja holds a **Master 2 Engineer Degree in Computer Science** from **ISPM** (Institut Supérieur Polytechnique de Madagascar)."
    },
    availability: {
      keywords: ["available", "remote", "freelance", "hire", "job", "contract", "work", "availability"],
      response: "Nanja is **available for international Freelance contracts and Remote engineering roles** worldwide."
    },
    cv: {
      keywords: ["cv", "resume", "pdf", "download", "ats"],
      response: "You can download his **ATS-compliant Engineer CV (PDF)** using the **'CV ATS'** button in the navbar!"
    },
    projects: {
      keywords: ["project", "projects", "portfolio", "work", "client", "experience", "built"],
      response: "Nanja has built high-performance web applications for international clients (secure SaaS, analytics dashboards, API architectures, and security audit tools)."
    },
    greeting: {
      keywords: ["hello", "hi", "hey", "greetings", "good morning", "good evening"],
      response: "Hello! I am **Nanja's AI Assistant Agent**. How can I help you today? Feel free to ask about his contact info, address, skills, rates, or OWASP security expertise!"
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

  // 1. Fully normalize query (lowercase + remove accents & special chars)
  const normalizedQuery = normalizeText(userPrompt);

  if (!normalizedQuery) return knowledgeBase.greeting.response;

  // Split query into individual normalized word tokens
  const words = normalizedQuery.split(/\s+/);

  let bestMatchKey = null;
  let maxScore = 0;

  for (const key in knowledgeBase) {
    const entry = knowledgeBase[key];
    let score = 0;

    for (const rawKeyword of entry.keywords) {
      const keyword = normalizeText(rawKeyword);

      // Full substring match in normalized query (High weight)
      if (normalizedQuery.includes(keyword)) {
        score += keyword.length > 4 ? 6 : 4;
      }

      // Word token match
      for (const word of words) {
        if (word === keyword) {
          score += 5;
        } else if (word.length >= 4 && (keyword.includes(word) || word.includes(keyword))) {
          score += 3;
        }
      }
    }

    if (score > maxScore) {
      maxScore = score;
      bestMatchKey = key;
    }
  }

  if (maxScore > 0 && bestMatchKey && knowledgeBase[bestMatchKey]) {
    return knowledgeBase[bestMatchKey].response;
  }

  // Fallback response
  return lang === "fr"
    ? `En tant qu'**IA d'Assistance de Nanja**, je peux vous donner ses **coordonnées** (Email, Téléphone, LinkedIn, GitHub), sa **localisation à Antananarivo (Remote Worldwide)**, ses **compétences Full Stack (React/Node.js)**, sa formation d'**Ingénieur ISPM (Master 2)**, ou ses tarifs & délais. Que souhaitez-vous savoir ?`
    : `As **Nanja's AI Assistant Agent**, I can give you his **contact info** (Email, Phone, LinkedIn, GitHub), **location in Antananarivo (Remote Worldwide)**, **Full Stack skills (React/Node.js)**, **ISPM Master 2 Engineer Degree**, or rates & timelines. What would you like to know?`;
};
