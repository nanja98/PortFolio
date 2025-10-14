// src/pages/home.jsx
import React from "react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      {/* --- Navbar --- */}
      <nav className="w-full bg-white shadow-md fixed top-0 left-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">UCREF App</h1>
          <ul className="hidden md:flex gap-6 text-gray-700 font-medium">
            <li className="hover:text-blue-600 cursor-pointer">Accueil</li>
            <li className="hover:text-blue-600 cursor-pointer">Fonctionnalités</li>
            <li className="hover:text-blue-600 cursor-pointer">Contact</li>
          </ul>
          <button className="md:hidden text-blue-600 text-2xl">&#9776;</button>
        </div>
      </nav>

      {/* --- Hero Section --- */}
      <section className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-6 pt-28 pb-20">
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-blue-600">
            Gérez vos données en toute simplicité
          </h2>
          <p className="text-gray-600 mb-6">
            Notre application de gestion de bases de données facilite le suivi,
            la mise à jour et la sécurisation de vos informations sur site.
          </p>
          <div className="flex justify-center md:justify-start gap-4">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">
              Commencer
            </button>
            <button className="px-6 py-3 bg-gray-200 rounded-xl hover:bg-gray-300 transition">
              En savoir plus
            </button>
          </div>
        </div>

        <div className="flex-1 mt-10 md:mt-0">
          <img
            src="https://images.unsplash.com/photo-1556761175-4b46a572b786"
            alt="Gestion de données"
            className="w-full rounded-2xl shadow-lg"
          />
        </div>
      </section>

      {/* --- Features Section --- */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold mb-10 text-blue-600">Fonctionnalités</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-50 rounded-2xl shadow hover:shadow-lg transition">
              <h4 className="text-xl font-semibold mb-2">Analyse des besoins</h4>
              <p className="text-gray-600">
                Identification claire des besoins pour une solution sur mesure adaptée à votre organisation.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-2xl shadow hover:shadow-lg transition">
              <h4 className="text-xl font-semibold mb-2">Développement complet</h4>
              <p className="text-gray-600">
                Application développée en front-end et back-end pour une expérience fluide et performante.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-2xl shadow hover:shadow-lg transition">
              <h4 className="text-xl font-semibold mb-2">Gestion de données</h4>
              <p className="text-gray-600">
                Conception et maintenance de bases de données robustes et sécurisées.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Contact Section --- */}
      <section className="bg-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold mb-6 text-blue-600">Contactez-nous</h3>
          <p className="text-gray-600 mb-8">
            Vous souhaitez en savoir plus ? Envoyez-nous un message !
          </p>
          <form className="max-w-xl mx-auto flex flex-col gap-4">
            <input
              type="text"
              placeholder="Nom"
              className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <input
              type="email"
              placeholder="Email"
              className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <textarea
              placeholder="Votre message"
              rows="4"
              className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
            ></textarea>
            <button className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
              Envoyer
            </button>
          </form>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-white text-center py-6 border-t text-gray-600">
        © 2025 UCREF | Développé avec ❤️ par l’équipe de développement
      </footer>
    </div>
  );
}
