import React, { useState } from "react";
import "../styles/Contact.css";
import Navbar from "../components/Navbar";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Merci pour votre message ! (Formulaire en démonstration)");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="contact">
      <Navbar />

      <div className="contact-container">
        <div className="contact-info">
          <h1>Contactez-moi</h1>
          <p>
            N’hésitez pas à me contacter pour une collaboration, une mission ou
            simplement pour échanger sur un projet web. 
          </p>

          <div className="contact-details">
            <p><strong>Email :</strong> nanjarandriamalala98@gmail.com</p>
            <p><strong>Téléphone :</strong> +261 34 54 264 33</p>
            <p>
              <strong>LinkedIn :</strong>{" "}
              <a
                href="https://www.linkedin.com/in/nanja-randriamalala/"
                target="_blank"
                rel="noreferrer"
              >
                nanja-randriamalala
              </a>
            </p>
            <p>
              <strong>GitHub :</strong>{" "}
              <a
                href="https://github.com/nanja98"
                target="_blank"
                rel="noreferrer"
              >
                github.com/nanja98
              </a>
            </p>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <h2>Envoyer un message</h2>
          <input
            type="text"
            name="name"
            placeholder="Votre nom"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Votre adresse e-mail"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            rows="5"
            placeholder="Votre message..."
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit" className="btn">Envoyer</button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
