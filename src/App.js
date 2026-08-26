import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { LanguageProvider } from "./context/LanguageContext";
import Home from './pages/Accueil';
import Projects from './pages/Projet';
import Security from './pages/Security';
import About from './pages/About';
import Contact from './pages/Contact';
import SocialSidebar from './components/SocialSidebar';
import './App.css';

// Global scroll-reveal observer
function RevealObserver() {
  const location = useLocation();
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    const targets = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [location]);
  return null;
}

function App() {
  return (
    <LanguageProvider>
      <Router>
        <RevealObserver />
        <SocialSidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/security" element={<Security />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
}

export default App;
