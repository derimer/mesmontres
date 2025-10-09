import "./Categories.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
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
      {
        id: "calendrier-perpetuel",
        name: "Calendrier perpétuel",
        image: "./images/lotus.jpg",
        description:
          "Complication avancée avec correction automatique de la date",
        count: "5 modèles",
      },
      {
        id: "kinetic",
        name: "Kinetic",
        image: "./images/kinetic.jpg",
        description:
          "Technologie hybride convertissant le mouvement en énergie électrique",
        count: "12 modèles",
      },
    ],
  },
  {
    id: "quartz",
    name: "Montres à Quartz",
    image: "./images/quartz2.jpg",
    description: "Précision et facilité d'entretien, alimentées par pile",
    features: ["Haute précision", "Entretien simple", "Pile longue durée"],
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
  {
    id: "digitale",
    name: "Montres Digitales",
    image: "./images/digitale.jpg",
    description:
      "Modernité et fonctionnalités avancées avec affichage numérique",
    features: ["Affichage numérique", "Fonctions multiples", "Design moderne"],
    subcategories: [
      {
        id: "digitale-simple",
        name: "Digitale simple",
        image: "./images/simple.jpg",
        description: "Affichage digital basique et fonctionnel",
        count: "18 modèles",
      },
      {
        id: "mixte",
        name: "Mixte digitale/analogique",
        image: "./images/mixte.jpg",
        description: "Combinaison d'affichage digital et aiguilles analogiques",
        count: "7 modèles",
      },
    ],
  },
];

function Categories() {
  return (
    <div className="categories-container">
      <div className="categories-header">
        <h1> Catégories de Montres</h1>
        <p className="categories-intro">
          Découvrez la collection exclusive de montres soigneusement
          sélectionnées. Chaque catégorie représente un univers horloger unique,
          alliant tradition et innovation.
        </p>
      </div>

      <Carousel
        showArrows
        showStatus
        showIndicators
        showThumbs={false}
        infiniteLoop
        autoPlay
        stopOnHover
        useKeyboardArrows
        swipeable
        dynamicHeight={false}
        emulateTouch
        className="custom-carousel"
        interval={5000}
        transitionTime={600}
      >
        {categoriesData.map((family) => (
          <div key={family.id} className="carousel-slide">
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
        ))}
      </Carousel>

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
