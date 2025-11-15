import { Link } from "react-router-dom";
import "./SubcategoryCalendrierPerpetuel.css";

function SubcategoryCalendrierPerpetuel() {
  const characteristics = [
    {
      id: "calendrier-intelligent",
      title: "Calendrier Intelligent",
      description: "Reconnaît automatiquement les mois de 30 et 31 jours",
      icon: "📅"
    },
    {
      id: "correction-annees-bissextiles", 
      title: "Correction Années Bissextiles",
      description: "Tient compte du 29 février jusqu'en 2100",
      icon: "🔄"
    },
    {
      id: "precision-longue-duree",
      title: "Précision Longue Durée",
      description: "Ne nécessite aucun réglage jusqu'au 1er mars 2100",
      icon: "🎯"
    },
    {
      id: "complexite-horlogere",
      title: "Complexité Horlogère",
      description: "L'une des complications les plus prestigieuses",
      icon: "⚙️"
    }
  ];

  const displayFunctions = [
    { id: "func-1", title: "Date du Jour", description: "Affiche le jour du mois en cours" },
    { id: "func-2", title: "Jour de la Semaine", description: "Indique le lundi, mardi, etc." },
    { id: "func-3", title: "Mois de l'Année", description: "Montre le mois actuel" },
    { id: "func-4", title: "Année Bissextile", description: "Indicateur des années bissextiles" },
    { id: "func-5", title: "Phase de Lune", description: "Affiche les phases lunaires" }
  ];

  const maintenanceTips = [
    { id: "tip-1", text: "Évitez de régler le calendrier entre 21h et 3h, période de changement automatique" },
    { id: "tip-2", text: "Faites réviser le mécanisme calendaire tous les 3-4 ans par un spécialiste" },
    { id: "tip-3", text: "Utilisez la couronne avec précaution lors des réglages de date" },
    { id: "tip-4", text: "Stockez la montre avec la réserve de marche pleine pour maintenir la précision" }
  ];

  return (
    <div className="subcategory-calendrier-perpetuel">
        <div className="imgmeca">
        <img 
          src="/images/montreCalendrierPerpetuel.jpg" 
          alt="Montre calendrier perpétuel - horlogerie traditionnelle" 
        />
      </div>
      {/* En-tête Hero */}
      <div className="calendrier-hero">
        <div className="hero-content">
          <h1>Calendriers Perpétuels</h1>
          <p className="hero-subtitle">La mémoire du temps</p>
          <p className="hero-description">
            Avec cadrans jour et date. Le calendrier perpétuel est l'une des complications 
            les plus admirées en horlogerie, capable de mémoriser la longueur variable 
            des mois et les années bissextiles jusqu'en 2100.
          </p>
        </div>
      </div>

      {/* Section Caractéristiques */}
      <div className="characteristics-section">
        <h2>Génie du Calendrier Perpétuel</h2>
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

      {/* Section Affichages */}
      <div className="displays-section">
        <h2>Informations Affichées</h2>
        <div className="displays-grid">
          {displayFunctions.map((func) => (
            <div key={func.id} className="display-card">
              <h3>{func.title}</h3>
              <p>{func.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Section Technique */}
      <div className="technical-section">
        <h2>Spécifications Techniques</h2>
        <div className="specs-container">
          <div className="spec-group">
            <h3>Mécanisme Calendaire</h3>
            <ul>
              <li>Type : Calendrier perpétuel mécanique</li>
              <li>Programmation : Jusqu'au 28 février 2100</li>
              <li>Correction : Automatique des mois courts et longs</li>
              <li>Années bissextiles : Reconnaissance automatique</li>
            </ul>
          </div>
          <div className="spec-group">
            <h3>Affichages</h3>
            <ul>
              <li>Date : 1 à 31 avec correction mensuelle</li>
              <li>Jour : Lundi à dimanche</li>
              <li>Mois : Janvier à décembre</li>
              <li>Phase de lune : 29,5 jours de précision</li>
              <li>Année bissextile : Indicateur dédié</li>
            </ul>
          </div>
          <div className="spec-group">
            <h3>Complexité</h3>
            <ul>
              <li>Nombre de pièces : 150 à 400 supplémentaires</li>
              <li>Programmation : Came en forme de cœur</li>
              <li>Mémoire : 48 mois de programmation</li>
              <li>Précision : 122 ans sans ajustement</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Section Fonctionnement */}
      <div className="operation-section">
        <h2>Comment ça Fonctionne ?</h2>
        <div className="operation-content">
          <div className="operation-step">
            <span className="step-icon">1</span>
            <div className="step-content">
              <h4>Mémoire Mécanique</h4>
              <p>Une came programme les longueurs de mois sur 4 ans</p>
            </div>
          </div>
          <div className="operation-step">
            <span className="step-icon">2</span>
            <div className="step-content">
              <h4>Correction Automatique</h4>
              <p>Le mécanisme ajuste la date à la fin des mois de 30 jours</p>
            </div>
          </div>
          <div className="operation-step">
            <span className="step-icon">3</span>
            <div className="step-content">
              <h4>Exception Bissextile</h4>
              <p>Reconnaît février bissextile et passe au 1er mars automatiquement</p>
            </div>
          </div>
        </div>
      </div>

      {/* Section Entretien */}
      <div className="maintenance-section">
        <h2>Conseils d'Utilisation</h2>
        <div className="maintenance-content">
          <div className="maintenance-intro">
            <p>
              Un calendrier perpétuel est une merveille d'ingénierie mécanique 
              qui demande des précautions particulières pour préserver sa précision.
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
        <h2>Pourquoi un Calendrier Perpétuel ?</h2>
        <div className="advantages-grid">
          <div className="advantage-card">
            <h3>✅ Précision Absolue</h3>
            <p>Plus jamais de réglage manuel de date, même pour les années bissextiles</p>
          </div>
          <div className="advantage-card">
            <h3>✅ Prestige Horloger</h3>
            <p>L'une des complications les plus prestigieuses et complexes</p>
          </div>
          <div className="advantage-card">
            <h3>✅ Héritage Technique</h3>
            <p>Pièce d'exception qui représente le sommet de l'art horloger</p>
          </div>
          <div className="advantage-card">
            <h3>✅ Valeur de Collection</h3>
            <p>Investissement horloger qui prend de la valeur avec le temps</p>
          </div>
        </div>
      </div>

      {/* CTA Informative */}
      <div className="info-cta">
        <h3>Intéressé par un calendrier perpétuel ?</h3>
        <p>Je vous conseille sur ces pièces d'exception et leur utilisation au quotidien.</p>
        <Link to="/contact" className="info-button">
          Contactez-moi
        </Link>
      </div>
    </div>
  );
};

export default SubcategoryCalendrierPerpetuel;