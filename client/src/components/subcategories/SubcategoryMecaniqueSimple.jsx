import "./SubcategoryMecaniqueSimple.css";
import { Link } from "react-router-dom";

function SubcategoryMecaniqueSimple() {
  const characteristics = [
    {
      id: "mouvement-pur",
      title: "Mouvement Pur",
      description: "Mécanisme à remontage manuel sans complication",
      icon: "⚙️"
    },
    {
      id: "simplicite-elegante",
      title: "Simplicité Élégante", 
      description: "Deux aiguilles ou deux aiguilles avec trotteuse",
      icon: "✨"
    },
    {
      id: "artisanat-traditionnel",
      title: "Artisanat Traditionnel",
      description: "Finitions main et décorations guillochées",
      icon: "👨‍🔧"
    },
    {
      id: "autonomie",
      title: "Autonomie",
      description: "Réserve de marche de 40 à 48 heures",
      icon: "⏱️"
    }
  ];

  const maintenanceTips = [
    { id: "tip-1", text: "Remontez votre montre à la même heure chaque jour pour une précision optimale" },
    { id: "tip-2", text: "Évitez les chocs violents et les champs magnétiques intenses" },
    { id: "tip-3", text: "Faites réviser votre montre tous les 3 à 5 ans par un horloger qualifié" },
    { id: "tip-4", text: "Stockez votre montre dans un endroit sec, à l'abri de la poussière" }
  ];

  return (
    <div className="subcategory-mecanique-simple">
      {/* En-tête Hero */}
      <div className="mecanique-hero">
        <div className="hero-content">
          <h1>Montres Mécaniques Simples</h1>
          <p className="hero-subtitle">L'essence pure de l'horlogerie traditionnelle</p>
          <p className="hero-description">
            Deux aiguilles, ou deux aiguilles avec trotteuse. La simplicité au service 
            de l'élégance intemporelle et de l'art horloger authentique. 
            Découvrez la beauté du mouvement mécanique dans sa forme la plus pure.
          </p>
        </div>
      </div>

      {/* Section Caractéristiques */}
      <div className="characteristics-section">
        <h2>Caractéristiques Distinctives</h2>
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

      {/* Section Technique */}
      <div className="technical-section">
        <h2>Spécifications Techniques</h2>
        <div className="specs-container">
          <div className="spec-group">
            <h3>Mouvement</h3>
            <ul>
              <li>Type : Mécanique à remontage manuel</li>
              <li>Fréquence : 21 600 alternances/heure (3 Hz)</li>
              <li>Réserve de marche : 42-48 heures</li>
              <li>Pierres : 17 à 21 rubis</li>
            </ul>
          </div>
          <div className="spec-group">
            <h3>Affichage</h3>
            <ul>
              <li>Configuration : 2 aiguilles ou 2 aiguilles + trotteuse</li>
              <li>Cadran : Émaillé, guilloché ou argenté</li>
              <li>Index : Bâtons, chiffres romains ou arabes</li>
            </ul>
          </div>
          <div className="spec-group">
            <h3>Finitions</h3>
            <ul>
              <li>Côtes de Genève sur les ponts</li>
              <li>Anglage et polissage des bords</li>
              <li>Perlage sur les platines</li>
              <li>Polissage miroir des vis</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Section Entretien */}
      <div className="maintenance-section">
        <h2>Conseils d'Entretien</h2>
        <div className="maintenance-content">
          <div className="maintenance-intro">
            <p>
              Une montre mécanique simple est un instrument de précision qui nécessite 
              un entretien régulier pour maintenir ses performances optimales.
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

      {/* Section Avantages */}
      <div className="advantages-section">
        <h2>Pourquoi Choisir une Mécanique Simple ?</h2>
        <div className="advantages-grid">
          <div className="advantage-card">
            <h3> Durabilité</h3>
            <p>Pas de pile à remplacer, une longévité exceptionnelle avec un entretien approprié</p>
          </div>
          <div className="advantage-card">
            <h3> Authenticité</h3>
            <p>L'art horloger dans sa forme la plus pure, sans complications superflues</p>
          </div>
          <div className="advantage-card">
            <h3> Élégance Intemporelle</h3>
            <p>Un design épuré qui traverse les modes et les générations</p>
          </div>
          <div className="advantage-card">
            <h3> Relation Unique</h3>
            <p>Le rituel quotidien du remontage crée un lien particulier avec votre montre</p>
          </div>
        </div>
      </div>

      <div className="info-cta">
        <h3>Envie d'en savoir plus sur les montres mécaniques simples ?</h3>
        <p>Je suis à votre disposition pour toute information complémentaire.</p>
        <Link to="/contact" className="info-button">
          Contactez-moi
        </Link>
      </div>
    </div>
  );
};

export default SubcategoryMecaniqueSimple;