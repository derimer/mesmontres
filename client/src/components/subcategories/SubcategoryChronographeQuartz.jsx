import { Link } from "react-router-dom";
import "./SubcategoryChronographeQuartz.css";

function SubcategoryChronographeQuartz() {
  const characteristics = [
    {
      id: "precision-electronique",
      title: "Précision Électronique",
      description: "Chronomètre au 1/10e ou 1/100e de seconde",
      icon: "🎯"
    },
    {
      id: "facilite-utilisation", 
      title: "Facilité d'Utilisation",
      description: "Poussoirs réactifs, remise à zéro instantanée",
      icon: "⚡"
    },
    {
      id: "fonctions-avancees",
      title: "Fonctions Avancées",
      description: "Tachyomètre, télémètre, alarmes multiples",
      icon: "📊"
    },
    {
      id: "robustesse",
      title: "Robustesse",
      description: "Résiste mieux aux chocs que les chronos mécaniques",
      icon: "💪"
    }
  ];

  const chronoFunctions = [
    { id: "func-1", name: "Chronographe Standard", precision: "1/5e de seconde", capacity: "60 minutes" },
    { id: "func-2", name: "Chronographe Fractionné", precision: "1/100e de seconde", capacity: "12 heures" },
    { id: "func-3", name: "Compte à Rebours", precision: "1 seconde", capacity: "24 heures" },
    { id: "func-4", name: "Mémoire des Temps", precision: "Variable", capacity: "50 tours" }
  ];

  const scalesFeatures = [
    { id: "scale-1", feature: "Tachyomètre", use: "Mesure de vitesse sur base 1000m" },
    { id: "scale-2", feature: "Télémètre", use: "Mesure de distance par le son" },
    { id: "scale-3", feature: "Pulsomètre", use: "Calcul du rythme cardiaque" },
    { id: "scale-4", feature: "Asthmomètre", use: "Mesure de la fréquence respiratoire" }
  ];

  const maintenanceTips = [
    { id: "tip-1", text: "Évitez d'actionner les poussoirs sous l'eau, même sur les modèles étanches" },
    { id: "tip-2", text: "Remplacez la pile dès l'apparition de l'indicateur de faible charge" },
    { id: "tip-3", text: "Nettoyez les poussoirs régulièrement pour éviter l'encrassement" },
    { id: "tip-4", text: "Faites vérifier l'étanchéité annuellement si utilisée pour les sports nautiques" }
  ];

  const usageScenarios = [
    { id: "scenario-1", activity: "🏃 Sports", use: "Chronométrage des performances et tours" },
    { id: "scenario-2", activity: "👨‍⚕️ Médical", use: "Prise de pouls et mesures médicales" },
    { id: "scenario-3", activity: "🚗 Automobile", use: "Mesure de vitesse et temps au tour" },
    { id: "scenario-4", activity: "🎯 Professionnel", use: "Timing de présentations et réunions" }
  ];

  return (
    <div className="subcategory-chronographe-quartz">
       <div className="imgmeca">
        <img 
          src="/images/montreChronographeSimple.jpg" 
          alt="Montre mécanique simple - horlogerie traditionnelle" 
        />
      </div>
      {/* En-tête Hero */}
      <div className="chrono-quartz-hero">
        <div className="hero-content">
          <h1>Chronographes Quartz</h1>
          <p className="hero-subtitle">Précision et performance accessibles</p>
          <p className="hero-description">
            Avec cadrans minutes, secondes et heures sur 24h. La technologie quartz 
            rend les fonctions chronographe avancées accessibles à tous, avec une 
            précision inégalée et une fiabilité exemplaire.
          </p>
        </div>
      </div>

      {/* Section Caractéristiques */}
      <div className="characteristics-section">
        <h2>L'Avantage Quartz Chronographe</h2>
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

      {/* Section Fonctions Chrono */}
      <div className="functions-section">
        <h2>Types de Chronographes Quartz</h2>
        <div className="functions-table">
          <div className="table-header">
            <div className="col-function">Fonction</div>
            <div className="col-precision">Précision</div>
            <div className="col-capacity">Capacité</div>
          </div>
          {chronoFunctions.map((func) => (
            <div key={func.id} className="table-row">
              <div className="col-function">
                <strong>{func.name}</strong>
              </div>
              <div className="col-precision">{func.precision}</div>
              <div className="col-capacity">{func.capacity}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Section Échelles de Mesure */}
      <div className="scales-section">
        <h2>Échelles de Mesure Intégrées</h2>
        <div className="scales-grid">
          {scalesFeatures.map((scale) => (
            <div key={scale.id} className="scale-card">
              <h3>{scale.feature}</h3>
              <p>{scale.use}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Section Technique */}
      <div className="technical-section">
        <h2>Spécifications Techniques</h2>
        <div className="specs-container">
          <div className="spec-group">
            <h3>Mouvement Chronographe</h3>
            <ul>
              <li>Type : Module quartz dédié chronographe</li>
              <li>Précision : ±15 secondes/mois (mouvement base)</li>
              <li>Poussoirs : 2 à 4 selon complexité</li>
              <li>Affichage : Analogique ou analogique/numérique</li>
            </ul>
          </div>
          <div className="spec-group">
            <h3>Performance Chrono</h3>
            <ul>
              <li>Précision chrono : 1/5e à 1/100e de seconde</li>
              <li>Temps de mesure : 30 minutes à 12 heures</li>
              <li>Mémoire : 1 à 50 temps enregistrés</li>
              <li>Fonctions : Standard, split, flyback, compte à rebours</li>
            </ul>
          </div>
          <div className="spec-group">
            <h3>Électronique</h3>
            <ul>
              <li>Pile : Lithium 1.5V ou 3V</li>
              <li>Autonomie : 2-3 ans (chrono utilisé modérément)</li>
              <li>Affichage : LCD ou rétroéclairage LED</li>
              <li>Résistance : 10 000 g (résistance aux chocs)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Section Utilisation */}
      <div className="usage-section">
        <h2>Domaines d'Utilisation</h2>
        <div className="usage-grid">
          {usageScenarios.map((scenario) => (
            <div key={scenario.id} className="usage-card">
              <div className="usage-icon">{scenario.activity}</div>
              <div className="usage-content">
                <h3>{scenario.activity.replace(/[🏃👨‍⚕️🚗🎯]/g, '').trim()}</h3>
                <p>{scenario.use}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section Avantages vs Mécanique */}
      <div className="comparison-section">
        <h2>Quartz vs Mécanique : Le Match</h2>
        <div className="comparison-cards">
          <div className="comparison-card quartz">
            <h3>⚡ Chronographe Quartz</h3>
            <div className="pros-cons">
              <div className="pros">
                <h4>✅ Avantages</h4>
                <ul>
                  <li>Précision extrême (1/100e s)</li>
                  <li>Facilité d'utilisation</li>
                  <li>Coût accessible</li>
                  <li>Résistance aux chocs</li>
                  <li>Fonctions avancées</li>
                </ul>
              </div>
              <div className="cons">
                <h4>❌ Limitations</h4>
                <ul>
                  <li>Pile à remplacer</li>
                  <li>Moins de prestige horloger</li>
                  <li>Électronique sensible à l'humidité</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="comparison-card mechanical">
            <h3>⚙️ Chronographe Mécanique</h3>
            <div className="pros-cons">
              <div className="pros">
                <h4>✅ Avantages</h4>
                <ul>
                  <li>Prestige et valeur de collection</li>
                  <li>Énergie mécanique pure</li>
                  <li>Artisanat horloger</li>
                  <li>Durée de vie très longue</li>
                </ul>
              </div>
              <div className="cons">
                <h4>❌ Limitations</h4>
                <ul>
                  <li>Précision moindre</li>
                  <li>Prix élevé</li>
                  <li>Entretien complexe</li>
                  <li>Sensible aux chocs</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section Entretien */}
      <div className="maintenance-section">
        <h2>Conseils d'Entretien</h2>
        <div className="maintenance-content">
          <div className="maintenance-intro">
            <p>
              Un chronographe quartz combine mécanique et électronique, 
              demandant des précautions spécifiques pour une longue durée de vie.
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
        <h3>Besoin d'un chronographe précis et fiable ?</h3>
        <p>Je vous aide à choisir le chronographe quartz adapté à vos besoins spécifiques.</p>
       <Link className="info-button" to="/contact">Contactez-moi</Link>
      </div>
    </div>
  );
};

export default SubcategoryChronographeQuartz;