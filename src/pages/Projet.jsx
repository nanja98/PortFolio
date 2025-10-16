import React from "react";
import "../styles/Projet.css";
import Navbar from "../components/Navbar";
import LogoMedd from "../images/LogoMEDD.png";
import LogoCidst from "../images/LogoCidst.png";

const Projects = () => {
  const projectList = [
    {
      title: "Application de Gestion de Données – UCREF",
      description:
        "Développement d’une application complète (front-end & back-end) pour la gestion des données du Ministère de l’Environnement. Conception, analyse des besoins et gestion des bases de données.",
      image: LogoMedd,
      link: "#",
    },
    {
      title: "Application Web Interactive – CIDST Tsimbazaza",
      description:
        "Réalisation d’une application web pour la numérisation de la recherche scientifique : ajout, modification, recherche de publications et authentification sécurisée.",
      image: LogoCidst,
      link: "#",
    },
    {
      title: "Site de Voyage – Freelance",
      description:
        "Création d’un site web responsive avec HTML, CSS et JavaScript. Fonctionnalités : recherche, réservation, cartographie et design moderne.",
      image: "https://via.placeholder.com/400x250",
      link: "#",
    },
  ];

  return (
    <section id="projects" className="projects">
      <Navbar />
      <div className="container">
        <h1 className="title">Mes Projets Réalisés</h1>
        <p className="subtitle">
          Voici quelques-unes des applications que j’ai conçues et développées.
        </p>

        <div className="project-grid">
          {projectList.map((project, index) => (
            <div className="project-card" key={index}>
              <img src={project.image} alt={project.title} />
              <div className="project-info">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <a href={project.link} className="btn" target="_blank" rel="noreferrer">
                  Voir le projet
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
