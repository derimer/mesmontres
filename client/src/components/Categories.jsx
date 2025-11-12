import "./Categories.css";
import { Link } from "react-router-dom";

const categoriesData = [
  {
    id: "mecaniques",
    name: "Montres Mécaniques",
    image: "./images/mecaniques.jpg",
    description: "L'art de l'horlogerie traditionnelle, des mouvements complexes sans pile",
    waterResistance: [
      { atm: 3, metres: 30, usage: "Résiste aux éclaboussures et à la pluie" },
      { atm: 5, metres: 50, usage: "Douche ou lavage des mains possible" },
      { atm: 10, metres: 100, usage: "Convient à la natation" },
      { atm: 20, metres: 200, usage: "Adaptée à la plongée légère" },
      { atm: 30, metres: 300, usage: "Utilisable pour la plongée sous-marine" },
    ],
    subcategories: [
      {
        id: "mecanique-simple",
        name: "Mécanique simple",
        image: "/images/montreMecaniqueSimple.jpg",
        description: "En général, deux aiguilles, ou deux aiguilles + trotteuse",
         // AJOUTÉ
      },
      {
        id: "automatique",
        name: "Automatique",
        image: "./images/automatiques.jpg",
        description: "En général deux aiguilles + trotteuse",
        // AJOUTÉ
      },
      {
        id: "chronographe-mecanique",
        name: "Chronographe",
        image: "./images/pulsar.jpg",
        description: "Avec cadrans minutes, secondes et heures sur 24h",
       
      },
      {
        id: "calendrier-perpetuel",
        name: "Calendrier perpétuel",
        image: "./images/montreCalendrierPerpetuel.jpg",
        description: "Avec cadrans jour et date",
         // AJOUTÉ
      },
      {
        id: "kinetic",
        name: "Kinetic",
        image: "./images/kinetic.jpg",
        description: "Automatique avec batterie de réserve de marche",
         // AJOUTÉ
      }
    ]
  },
  {
    id: "quartz",
    name: "Montres à Quartz",
    image: "./images/quartz2.jpg",
    description: "Précision et facilité d'entretien, alimentées par pile",
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
        description: "Deux aiguilles + trotteuse",
         // AJOUTÉ
      },
      {
        id: "chronographe-quartz",
        name: "Chronographe",
        image: "./images/chronographe2.jpg",
        description: "Avec cadrans minutes, secondes et heures sur 24h",
        // AJOUTÉ
      }
    ]
  },
  {
    id: "digitale",
    name: "Montres Digitales",
    image: "./images/digitale.jpg",
    description: "Affichage numérique moderne et fonctionnel",
    waterResistance: [
      { atm: 3, metres: 30, usage: "Résiste aux éclaboussures" },
      { atm: 5, metres: 50, usage: "Usage quotidien et lavage des mains" },
      { atm: 10, metres: 100, usage: "Activités nautiques légères" },
    ],
    subcategories: [
      {
        id: "digitale-simple",
        name: "Digitale simple",
        image: "./images/montreDigitaleSimple.jpg",
        description: "Écran simple ou multi-écrans",
         // AJOUTÉ
      },
      {
        id: "mixte",
        name: "Mixte digitale/analogique",
        image: "./images/mixte.jpg",
        description: "Digitale avec en plus aiguilles et trotteuse",
         // AJOUTÉ
      }
    ]
  }
];

// Tableau de résistance à l'eau général
const generalWaterResistance = [
  { atm: 1, metres: 10, usage: "Éclaboussures uniquement" },
  { atm: 3, metres: 30, usage: "Résiste aux éclaboussures et à la pluie" },
  { atm: 5, metres: 50, usage: "Douche ou lavage des mains possible" },
  { atm: 10, metres: 100, usage: "Convient à la natation" },
  { atm: 20, metres: 200, usage: "Adaptée à la plongée légère" },
  { atm: 30, metres: 300, usage: "Utilisable pour la plongée sous-marine" },
  { atm: 50, metres: 500, usage: "Plongée professionnelle" },
];

function Categories() {
  return (
    <div className="categories-container">
      <div className="categories-header">
        <h1>Typologie de Montres</h1>
        <p className="categories-intro">
          Découvrez notre classification complète selon les types de mouvement et d'affichage. 
          Chaque catégorie représente une approche unique de la mesure du temps.
        </p>
      </div>

      {/* TABLEAU DE RÉSISTANCE À L'EAU EN HAUT */}
      <div className="water-resistance-global">
        <h2>Guide de Résistance à l'Eau</h2>
        <p className="water-resistance-intro">
          Comprenez les niveaux de résistance à l'eau pour choisir la montre adaptée à vos activités.
        </p>
        <table className="water-table">
          <thead>
            <tr>
              <th>ATM</th>
              <th>Équivalent (mètres)</th>
              <th>Utilisation recommandée</th>
            </tr>
          </thead>
          <tbody>
            {generalWaterResistance.map((item) => (
              <tr key={item.atm}>
                <td>{item.atm} ATM</td>
                <td>{item.metres} m</td>
                <td>{item.usage}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="water-note">
          💡 <strong>Note :</strong> La résistance à l'eau n'est pas permanente et peut diminuer avec le temps. 
          Un entretien régulier est recommandé.
        </p>
      </div>

      {/* LISTE DES CATÉGORIES PRINCIPALES */}
      <div className="categories-grid">
        {categoriesData.map((category) => (
          <div key={category.id} className="category-card">
            <div className="category-header">
              <div className="category-image-container">
                <img
                  className="category-image"
                  src={category.image}
                  alt={category.name}
                />
                <div className="category-overlay">
                  <h2 className="category-title">{category.name}</h2>
                  <p className="category-description">{category.description}</p>
                </div>
              </div>
            </div>

            <div className="category-content">
              {/* Résistance à l'eau spécifique à la catégorie */}
              <div className="category-water-resistance">
                <h3>Résistance à l'eau typique pour cette catégorie</h3>
                <div className="water-resistance-badges">
                  {category.waterResistance.map((item) => (
                    <div key={item.atm} className="water-badge">
                      <span className="water-atm">{item.atm} ATM</span>
                      <span className="water-meters">{item.metres}m</span>
                      <span className="water-usage">{item.usage}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="subcategories-section">
                <h3 className="subcategories-title">Sous-catégories</h3>
                <div className="subcategories-list">
                  {category.subcategories.map((sub) => (
                    <div key={sub.id} className="subcategory-item">
                      <Link
                        to={`/subcategories/${sub.id}`}
                        className="subcategory-link"
                      >
                        <div className="subcategory-info">
                          <h4 className="subcategory-name">{sub.name}</h4>
                          <p className="subcategory-description">
                            {sub.description}
                          </p>
                          <span className="models-count">{sub.count}</span>
                        </div>
                        <div className="subcategory-image-container">
                          <img
                            src={sub.image}
                            alt={sub.name}
                            className="subcategory-image"
                            draggable="false"
                          />
                          <div className="subcategory-overlay">
                            <span className="discover-text">→</span>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
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