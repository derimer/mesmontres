import { Link } from "react-router-dom";
import "./SubcategoryAutomatique.css";

function SubcategoryAutomatique() {
  const characteristics = [
    {
      id: "remontage-automatique",
      title: "Remontage Automatique",
      description: "Le mouvement du poignet remonte la montre automatiquement",
      icon: "🔄"
    },
    {
      id: "rotor-oscillant",
      title: "Rotor Oscillant", 
      description: "Masse oscillante qui convertit le mouvement en énergie",
      icon: "⚖️"
    },
    {
      id: "confort-quotidien",
      title: "Confort Quotidien",
      description: "Pas besoin de remontage manuel quotidien",
      icon: "💫"
    },
    {
      id: "precision-mecanique",
      title: "Précision Mécanique",
      description: "Régulateur à balancier pour une excellente précision",
      icon: "🎯"
    }
  ];

  const maintenanceTips = [
    { id: "tip-1", text: "Portez votre montre au moins 8 heures par jour pour un remontage optimal" },
    { id: "tip-2", text: "Utilisez un remontoir si vous ne portez pas la montre quotidiennement" },
    { id: "tip-3", text: "Évitez les activités sportives violentes avec la montre au poignet" },
    { id: "tip-4", text: "Faites réviser le mouvement tous les 5 à 7 ans par un horloger qualifié" }
  ];

  const mechanismFeatures = [
    { id: "feature-1", title: "Rotor Bidirectionnel", description: "Remonte dans les deux sens de rotation pour une efficacité maximale" },
    { id: "feature-2", title: "Embrayage de Sécurité", description: "Protège le mécanisme en cas de surremontage" },
    { id: "feature-3", title: "Réserve de Marche", description: "Stocke l'énergie pour fonctionner même sans port" }
  ];

  return (
    <div className="subcategory-automatique">
       <div className="imgmeca">
        <img 
          src="/images/montreAutomatiqueSimple.webp" 
          alt="Montre automatique simple - horlogerie traditionnelle" 
        />
        </div>
      {/* En-tête Hero */}
      <div className="automatique-hero">
        <div className="hero-content">
          <h1>Montres Automatiques</h1>
          <p className="hero-subtitle">La magie du mouvement perpétuel</p>
          <p className="hero-description">
            En général deux aiguilles + trotteuse. Le remontage automatique transforme 
            l'énergie de vos mouvements en précision horlogère. 
            L'alliance parfaite entre tradition et modernité.
          </p>
        </div>
      </div>

      {/* Section Caractéristiques */}
      <div className="characteristics-section">
        <h2>Fonctionnement Automatique</h2>
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

      {/* Section Mécanisme */}
      <div className="mechanism-section">
        <h2>Le Secret du Rotor</h2>
        <div className="mechanism-content">
          <div className="mechanism-description">
            <p>
              Le rotor, une masse semi-circulaire, pivote librement à 360°. 
              Chaque mouvement de votre poignet fait tourner le rotor, 
              qui transmet cette énergie au ressort de barillet via un système de rouages.
            </p>
          </div>
          <div className="mechanism-features">
            {mechanismFeatures.map((feature) => (
              <div key={feature.id} className="mechanism-feature">
                <h4>{feature.title}</h4>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section Technique */}
      <div className="technical-section">
        <h2>Spécifications Techniques</h2>
        <div className="specs-container">
          <div className="spec-group">
            <h3>Mouvement</h3>
            <ul>
              <li>Type : Mécanique à remontage automatique</li>
              <li>Rotor : Central ou micro-rotor, souvent en tungstène</li>
              <li>Fréquence : 21 600 ou 28 800 alternances/heure</li>
              <li>Pierres : 25 à 31 rubis en moyenne</li>
            </ul>
          </div>
          <div className="spec-group">
            <h3>Performance</h3>
            <ul>
              <li>Réserve de marche : 38 à 72 heures selon le calibre</li>
              <li>Précision : -4/+6 secondes par jour en moyenne</li>
              <li>Autonomie : Fonctionne sans port pendant 1-3 jours</li>
            </ul>
          </div>
          <div className="spec-group">
            <h3>Avantages</h3>
            <ul>
              <li>Pratique : Pas de remontage manuel quotidien</li>
              <li>Écologique : Aucune pile nécessaire</li>
              <li>Durabilité : Mécanisme éprouvé pour la longévité</li>
              <li>Valeur : Patrimoine horloger transmissible</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Section Entretien */}
      <div className="maintenance-section">
        <h2>Conseils d'Utilisation</h2>
        <div className="maintenance-content">
          <div className="maintenance-intro">
            <p>
              Une montre automatique bien entretenue offre des décennies de service fidèle 
              et peut devenir un héritage familial précieux.
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
        <h2>Pourquoi Choisir une Automatique ?</h2>
        <div className="advantages-grid">
          <div className="advantage-card">
            <h3> Pratique au Quotidien</h3>
            <p>Portez-la régulièrement et elle se remonte toute seule, sans intervention manuelle</p>
          </div>
          <div className="advantage-card">
            <h3> Robustesse</h3>
            <p>Mécanisme éprouvé conçu pour la longévité et les conditions d'usage quotidien</p>
          </div>
          <div className="advantage-card">
            <h3> Écologique</h3>
            <p>Aucune pile, énergie 100% mécanique et renouvelable par le mouvement naturel</p>
          </div>
          <div className="advantage-card">
            <h3> Valeur Patrimoniale</h3>
            <p>Transmissible de génération en génération, gain de valeur dans le temps</p>
          </div>
        </div>
      </div>

      {/* CTA Informative */}
      <div className="info-cta">
        <h3>Intéressé par une montre automatique ?</h3>
        <p>Je suis à votre disposition pour vous conseiller sur le modèle qui correspond à votre style de vie.</p>
        <Link to="/contact" className="info-button">
          Contactez-moi
        </Link>
      </div>
    </div>
  );
}

export default SubcategoryAutomatique;