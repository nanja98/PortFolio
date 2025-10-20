import React from "react";
import "../styles/About.css";
import Navbar from "../components/Navbar";
import Profile from "../images/Photo.png"

const About = () => {
  return (
    <section id="about" className="about">
      <Navbar />

      <div className="about-container">
        <div className="about-text">
          <h1>À propos de moi</h1>
          <p>
            Je suis <span className="highlight">Nanja Randriamalala</span>, 
            Développeur Web diplômé en Master 2 Informatique et Télécommunications à l’ISPM.  
            Passionné par la création de solutions numériques modernes et 
            performantes, je me spécialise dans le développement d’applications 
            web responsives, la gestion de bases de données et la conception 
            front-end / back-end.
          </p>

          <p>
            Mon objectif est de concevoir des interfaces intuitives et de 
            développer des solutions efficaces qui répondent aux besoins des 
            utilisateurs, tout en appliquant de bonnes pratiques en matière 
            d’ergonomie, d’accessibilité et de sécurité.
          </p>

          <div className="skills">
            <h2>Compétences principales</h2>
            <ul>
              <li>HTML5 / CSS3 / JavaScript / TypeScript</li>
              <li>React.js / Node.js / Express / Prisma</li>
              <li>MySQL / API REST / GitHub</li>
              <li>Design UI/UX avec Figma</li>
            </ul>
          </div>

          <a href="/projects" className="btn">Voir mes projets</a>
        </div>

        <div className="about-image">
          <img src={Profile} alt="Photo de Nanja Randriamalala" />
        </div>
      </div>
    </section>
  );
};

export default About;
