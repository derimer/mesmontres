import { Link } from "react-router-dom";
import "./SubcategoryMixte.css";

function SubcategoryMixte() {
  const characteristics = [
    {
      id: "design-universel",
      title: "Design Universel",
      description: "Des lignes équilibrées et élégantes, adaptées à tous les poignets",
      icon: "🌍",
    },
    {
      id: "taille-equilibree",
      title: "Taille Équilibrée",
      description: "Boîtiers de 36 à 40 mm pour convenir aussi bien aux femmes qu’aux hommes",
      icon: "⚖️",
    },
    {
      id: "materiaux-soignes",
      title: "Matériaux Soignés",
      description: "Acier, cuir, or ou titane, choisis pour leur confort et durabilité",
      icon: "💎",
    },
    {
      id: "style-polyvalent",
      title: "Style Polyvalent",
      description: "Parfaite pour le quotidien, les occasions ou un style décontracté",
      icon: "🕶️",
    },
  ];

  const advantages = [
    {
      id: "avantage1",
      title: "✅ Élégance intemporelle",
      description: "Un équilibre parfait entre raffinement et sobriété",
    },
    {
      id: "avantage2",
      title: "✅ Confort universel",
      description: "Une montre pensée pour s’adapter à chaque morphologie",
    },
    {
      id: "avantage3",
      title: "✅ Choix esthétique",
      description: "Disponible en plusieurs finitions, bracelets et couleurs",
    },
    {
      id: "avantage4",
      title: "✅ Polyvalence quotidienne",
      description: "Convient aussi bien au bureau qu’aux sorties du week-end",
    },
  ];

  const maintenanceTips = [
    { id: "tip-1", text: "Nettoyez régulièrement le boîtier et le bracelet avec un chiffon doux" },
    { id: "tip-2", text: "Évitez les chocs et les champs magnétiques puissants" },
    { id: "tip-3", text: "Faites vérifier l’étanchéité une fois par an" },
    { id: "tip-4", text: "Faites réviser le mouvement tous les 3 à 5 ans selon l’usage" },
  ];

  return (
    <div className="subcategory-mixte">
      {/* Hero Section */}
      <div className="mixte-hero">
        <div className="hero-content">
          <h1>Montres Mixtes</h1>
          <p className="hero-subtitle">L’harmonie entre élégance et universalité</p>
          <p className="hero-description">
            Les montres mixtes allient style, confort et adaptabilité. 
            Ni trop grandes, ni trop petites, elles incarnent l’équilibre parfait 
            entre finesse et caractère.
          </p>
        </div>
      </div>

      {/* Characteristics Section */}
      <div className="characteristics-section">
        <h2>Caractéristiques des Montres Mixtes</h2>
        <div className="characteristics-grid">
          {characteristics.map((item) => (
            <div key={item.id} className="characteristic-card">
              <div className="characteristic-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Advantages Section */}
      <div className="advantages-section">
        <h2>Les Atouts des Montres Mixtes</h2>
        <div className="advantages-grid">
          {advantages.map((adv) => (
            <div key={adv.id} className="advantage-card">
              <h3>{adv.title}</h3>
              <p>{adv.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Maintenance Section */}
      <div className="maintenance-section">
        <h2>Conseils d’Entretien</h2>
        <div className="maintenance-content">
          <div className="maintenance-intro">
            <p>
              Prenez soin de votre montre mixte pour préserver son éclat et 
              son bon fonctionnement sur le long terme.
            </p>
          </div>
          <div className="tips-list">
            {maintenanceTips.map((tip, index) => (
              <div key={tip.id} className="tip-item">
                <span className="tip-number">{index + 1}</span>
                <p>{tip.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="info-cta">
        <h3>À la recherche d’une montre mixte idéale ?</h3>
        <p>Je vous aide à trouver la pièce qui reflète le mieux votre personnalité et votre style.</p>
       <Link to="/contact" className="info-button">Contactez-moi</Link>
      </div>
    </div>
  );
}

export default SubcategoryMixte;
