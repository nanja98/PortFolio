import React from "react";
import "./home.css";
import profileImg from "../../images/Photo.png";

const Home = () => {
  return (
    <section className="home">
      <div className="intro">
        <h1>Salut, je suis <span className="name">Nanja Randriamalala</span></h1>
        <h2>Développeur Web Full Stack</h2>
        <p>
          Passionné par la création d’applications web modernes et performantes.
          J’aime concevoir des interfaces intuitives et développer des solutions efficaces.
        </p>
        <div className="buttons">
          <a href="#projects" className="btn">Voir mes projets</a>
          <a href="#contact" className="btn btn-secondary">Me contacter</a>
        </div>
      </div>

      <div className="profile-img">
        <img src={profileImg} alt="Nanja Randriamalala" /> 
      </div>
    </section>
  );
};

export default Home;
