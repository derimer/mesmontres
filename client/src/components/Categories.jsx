import "./Categories.css";
import { useState } from "react";
import { Link } from "react-router-dom";

const categoriesData = [
  {
    id: "mecaniques",
    name: "Montres Mécaniques",
    image: "./images/mecaniques.jpg",
    description:
      "L'art de l'horlogerie traditionnelle, des mouvements complexes sans pile",
    features: [
      "Mouvement automatique",
      "Énergie par ressort",
      "Précision mécanique",
    ],
    waterResistance: [
      { atm: 3, metres: 30, usage: "Résiste aux éclaboussures et à la pluie" },
      { atm: 5, metres: 50, usage: "Douche ou lavage des mains possible" },
      { atm: 10, metres: 100, usage: "Convient à la natation" },
      { atm: 20, metres: 200, usage: "Adaptée à la plongée légère" },
      { atm: 30, metres: 300, usage: "Utilisable pour la plongée sous-marine" },
    ],
    subcategories: [
      {
        id: "automatique",
        name: "Automatique",
        image: "./images/automatiques.jpg",
        description: "Remontage automatique par le mouvement du poignet",
        count: "15 modèles",
      },
      {
        id: "chronographe",
        name: "Chronographe",
        image: "./images/pulsar.jpg",
        description: "Fonction chronographe intégrée pour mesures de temps",
        count: "8 modèles",
      },
    ],
  },
  {
    id: "quartz",
    name: "Montres à Quartz",
    image: "./images/quartz2.jpg",
    description: "Précision et facilité d'entretien, alimentées par pile",
    features: ["Haute précision", "Entretien simple", "Pile longue durée"],
    waterResistance: [
      { atm: 3, metres: 30, usage: "Éclaboussures seulement" },
      { atm: 5, metres: 50, usage: "Douche, pluie, lavage des mains" },
      { atm: 10, metres: 100, usage: "Natation et sports nautiques légers" },
    ],
    subcategories: [
      {
        id: "analogique-simple",
        name: "Analogique simple",
        image: "/images/quartz.jpg",
        description: "Design classique avec affichage à aiguilles",
        count: "22 modèles",
      },
      {
        id: "chronographe-quartz",
        name: "Chronographe Quartz",
        image: "./images/chronographe2.jpg",
        description: "Fonctions chronographe avec précision quartz",
        count: "10 modèles",
      },
    ],
  },
];

function Categories() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % categoriesData.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + categoriesData.length) % categoriesData.length
    );
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const family = categoriesData[currentSlide];

  return (
    <div className="categories-container">
      <div className="categories-header">
        <h1>Catégories de Montres</h1>
        <p className="categories-intro">
          Découvrez la collection exclusive de montres soigneusement
          sélectionnées. Chaque catégorie représente un univers horloger unique,
          alliant tradition et innovation.
        </p>
      </div>

      {/* CAROUSEL PERSONNALISÉ */}
      <div className="custom-carousel-wrapper">
        <div className="carousel-container">
          {/* Flèches de navigation */}
          <button
            type="button"
            className="carousel-arrow carousel-arrow-prev"
            onClick={prevSlide}
          >
            ‹
          </button>

          {/* Slide actuelle */}
          <div className="carousel-slide active">
            <div className="category-hero">
              <div className="category-image-container">
                <img
                  className="category-image"
                  src={family.image}
                  alt={family.name}
                />
                <div className="category-overlay">
                  <h2 className="category-title">{family.name}</h2>
                  <p className="category-description">{family.description}</p>
                </div>
              </div>
            </div>

            <div className="category-content">
              <div className="category-features">
                <h3>Caractéristiques principales</h3>
                <ul className="features-list">
                  {family.features.map((feature) => (
                    <li key={feature} className="feature-item">
                      <span className="feature-icon">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="water-resistance-section">
                <h3>Résistance à l'eau</h3>
                <table className="water-table">
                  <thead>
                    <tr>
                      <th>ATM</th>
                      <th>Équivalent (m)</th>
                      <th>Utilisation recommandée</th>
                    </tr>
                  </thead>
                  <tbody>
                    {family.waterResistance.map((item) => (
                      <tr key={item.atm}>
                        <td>{item.atm}</td>
                        <td>{item.metres} m</td>
                        <td>{item.usage}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="subcategories-section">
                <h3 className="subcategories-title">
                  Sous-catégories disponibles
                </h3>
                <div className="subcategories-grid">
                  {family.subcategories.map((sub) => (
                    <div key={sub.id} className="subcategory-card">
                      <Link
                        to={`/subcategories/${sub.id}`}
                        state={{ subcategory: sub }}
                        className="subcategory-link"
                      >
                        <div className="subcategory-image-container">
                          <img
                            src={sub.image}
                            alt={sub.name}
                            className="subcategory-image"
                            draggable="false"
                          />
                          <div className="subcategory-overlay">
                            <span className="discover-text">Découvrir</span>
                          </div>
                        </div>
                        <div className="subcategory-info">
                          <h4 className="subcategory-name">{sub.name}</h4>
                          <p className="subcategory-description">
                            {sub.description}
                          </p>
                          <span className="models-count">{sub.count}</span>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="carousel-arrow carousel-arrow-next"
            onClick={nextSlide}
          >
            ›
          </button>
        </div>

        {/* Indicateurs de slide */}
        <div className="carousel-indicators">
          {categoriesData.map((category, index) => (
            <button
              key={category.id}
              type="button"
              className={`carousel-indicator ${
                index === currentSlide ? "active" : ""
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Aller à la catégorie ${category.name}`}
            />
          ))}
        </div>
      </div>

      <div className="categories-footer">
        <p>
          💡 <strong>Conseil technique :</strong> Incertain du choix ?
          Contactez-moi pour une guidance personnalisée.
        </p>
        <Link to="/contact" className="expert-advice-link">
          Obtenir des conseils personnalisés
        </Link>
      </div>
    </div>
  );
}

export default Categories;
