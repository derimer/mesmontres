import { Link } from "react-router-dom";
import "./SubcategoryKinetic.css";

function SubcategoryKinetic() {
  const characteristics = [
    {
      id: "technologie-hybride",
      title: "Technologie Hybride",
      description: "Combine l'énergie cinétique et la précision électronique",
      icon: "⚡"
    },
    {
      id: "auto-alimentation", 
      title: "Auto-alimentation",
      description: "Génère sa propre électricité par le mouvement",
      icon: "🔄"
    },
    {
      id: "precision-quartz",
      title: "Précision Quartz",
      description: "Exactitude d'une montre à quartz sans changement de pile",
      icon: "🎯"
    },
    {
      id: "ecologique",
      title: "Écologique",
      description: "Aucune pile jetable, énergie renouvelable",
      icon: "🌱"
    }
  ];

  const advantages = [
    { id: "adv-1", title: "Autonomie Longue", description: "Jusqu'à 6 mois de réserve d'énergie sans port" },
    { id: "adv-2", title: "Maintenance Réduite", description: "Pas de remplacement de pile, pas de remontage manuel" },
    { id: "adv-3", title: "Robustesse", description: "Moins de pièces mobiles qu'un automatique traditionnel" },
    { id: "adv-4", title: "Précision Constante", description: "Exactitude quartz indépendante de la charge" }
  ];

  const maintenanceTips = [
    { id: "tip-1", text: "Portez la montre régulièrement pour maintenir la charge de la batterie" },
    { id: "tip-2", text: "Si la montre s'arrête, secouez-la doucement latéralement pour la redémarrer" },
    { id: "tip-3", text: "Évitez les chocs violents qui pourraient endommager le rotor" },
    { id: "tip-4", text: "Faites remplacer la batterie de recharge tous les 10-15 ans" }
  ];

  const kineticProcess = [
    { id: "step-1", step: "Mouvement", description: "Le porteur bouge son poignet" },
    { id: "step-2", step: "Rotation", description: "Le rotor tourne et génère de l'électricité" },
    { id: "step-3", step: "Stockage", description: "L'énergie est stockée dans un condensateur" },
    { id: "step-4", step: "Alimentation", description: "Le quartz est alimenté pour une précision constante" }
  ];

  return (
    <div className="subcategory-kinetic">
      {/* En-tête Hero */}
      <div className="kinetic-hero">
        <div className="hero-content">
          <h1>Montres Kinetic</h1>
          <p className="hero-subtitle">L'innovation énergétique</p>
          <p className="hero-description">
            Automatique avec batterie de réserve de marche. La technologie Kinetic 
            révolutionne l'horlogerie en combinant le meilleur des mondes mécanique 
            et électronique pour une précision parfaite sans entretien.
          </p>
        </div>
      </div>

      {/* Section Caractéristiques */}
      <div className="characteristics-section">
        <h2>La Technologie Kinetic</h2>
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

      {/* Section Processus */}
      <div className="process-section">
        <h2>Comment ça Fonctionne ?</h2>
        <div className="process-steps">
          {kineticProcess.map((step, index) => (
            <div key={step.id} className="process-step">
              <div className="step-indicator">
                <span className="step-number">{index + 1}</span>
                <div className="step-connector"/>
              </div>
              <div className="step-content">
                <h3>{step.step}</h3>
                <p>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section Avantages */}
      <div className="advantages-section">
        <h2>Avantages Kinetic</h2>
        <div className="advantages-grid">
          {advantages.map((advantage) => (
            <div key={advantage.id} className="advantage-card">
              <h3>{advantage.title}</h3>
              <p>{advantage.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Section Technique */}
      <div className="technical-section">
        <h2>Spécifications Techniques</h2>
        <div className="specs-container">
          <div className="spec-group">
            <h3>Génération d'Énergie</h3>
            <ul>
              <li>Rotor : Micro-générateur électromagnétique</li>
              <li>Efficacité : 5 minutes de port = 3 heures de marche</li>
              <li>Génération : Courant alternatif converti en continu</li>
              <li>Réserve : Condensateur haute capacité</li>
            </ul>
          </div>
          <div className="spec-group">
            <h3>Performance</h3>
            <ul>
              <li>Précision : ±15 secondes/mois (standard quartz)</li>
              <li>Autonomie : 3 à 6 mois sur batterie pleine</li>
              <li>Recharge : Complète en 2-3 jours de port normal</li>
              <li>Indicateur : Avertissement de faible charge</li>
            </ul>
          </div>
          <div className="spec-group">
            <h3>Durabilité</h3>
            <ul>
              <li>Batterie : Lithium-ion rechargeable</li>
              <li>Durée de vie : 10-15 ans avant remplacement</li>
              <li>Rotor : Roulements céramique sans entretien</li>
              <li>Électronique : Protégée contre les champs magnétiques</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Section Comparaison */}
      <div className="comparison-section">
        <h2>Kinetic vs Autres Technologies</h2>
        <div className="comparison-grid">
          <div className="comparison-card">
            <h3>⚙️ Mécanique Automatique</h3>
            <ul>
              <li>✅ Énergie mécanique pure</li>
              <li>✅ Aucune électronique</li>
              <li>❌ Précision variable</li>
              <li>❌ Réserve limitée (2-3 jours)</li>
            </ul>
          </div>
          <div className="comparison-card">
            <h3>🔋 Kinetic</h3>
            <ul>
              <li>✅ Précision quartz constante</li>
              <li>✅ Autonomie longue (3-6 mois)</li>
              <li>✅ Aucune pile jetable</li>
              <li>❌ Électronique intégrée</li>
            </ul>
          </div>
          <div className="comparison-card">
            <h3>⚡ Quartz Standard</h3>
            <ul>
              <li>✅ Précision excellente</li>
              <li>✅ Coût d'entrée bas</li>
              <li>❌ Piles à remplacer</li>
              <li>❌ Impact environnemental</li>
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
              La technologie Kinetic offre une grande fiabilité mais demande 
              quelques précautions pour optimiser sa durée de vie.
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

      {/* CTA Informative */}
      <div className="info-cta">
        <h3>Intéressé par la technologie Kinetic ?</h3>
        <p>Découvrez comment cette innovation peut révolutionner votre expérience horlogère.</p>
        <Link to="/contact" className="info-button">Contactez-moi</Link>
      </div>
    </div>
  );
};

export default SubcategoryKinetic;