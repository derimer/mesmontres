import { Link } from "react-router-dom";
import "./SubcategoryDigitaleSimple.css";

function SubcategoryDigitaleSimple() {
  const characteristics = [
    {
      id: "affichage-numerique",
      title: "Affichage Numérique",
      description: "Lecture instantanée et précise de l'heure en chiffres",
      icon: "🔢"
    },
    {
      id: "fonctions-avancees", 
      title: "Fonctions Avancées",
      description: "Alarmes, chronomètre, calendrier, etc.",
      icon: "⚡"
    },
    {
      id: "lisibilite-parfaite",
      title: "Lisibilité Parfaite",
      description: "Affichage clair même dans l'obscurité",
      icon: "👁️"
    },
    {
      id: "modernite",
      title: "Modernité",
      description: "Design contemporain et technologies innovantes",
      icon: "💫"
    }
  ];

  const displayTypes = [
    { id: "type-1", name: "LCD Standard", description: "Écran à cristaux liquides, économique et fiable" },
    { id: "type-2", name: "LED Rétroéclairé", description: "Éclairage puissant pour une lecture nocturne" },
    { id: "type-3", name: "E-Ink", description: "Consommation ultra-faible, visible en plein soleil" },
    { id: "type-4", name: "OLED", description: "Noirs profonds et contraste exceptionnel" }
  ];

  const digitalFunctions = [
    { id: "func-1", function: "Affichage Heure", description: "12h ou 24h avec secondes" },
    { id: "func-2", function: "Calendrier Complet", description: "Date, jour, mois, année" },
    { id: "func-3", function: "Alarmes Multiples", description: "Jusqu'à 5 alarmes programmables" },
    { id: "func-4", function: "Chronomètre", description: "Précision au 1/100e de seconde" },
    { id: "func-5", function: "Minuterie", description: "Compte à rebours programmable" },
    { id: "func-6", function: "Double Fuseau", description: "Heure locale et heure monde" }
  ];

  const technologyFeatures = [
    { id: "tech-1", feature: "Rétroéclairage", description: "Éclairage LED pour lecture nocturne" },
    { id: "tech-2", feature: "Étanchéité Renforcée", description: "Jusqu'à 200m pour les modèles sport" },
    { id: "tech-3", feature: "Bracelets Interchangeables", description: "Personnalisation facile du style" },
    { id: "tech-4", feature: "Connectivité", description: "Bluetooth et synchronisation smartphone" }
  ];

  const maintenanceTips = [
    { id: "tip-1", text: "Évitez l'exposition prolongée au soleil direct pour préserver l'écran" },
    { id: "tip-2", text: "Remplacez la pile dès l'apparition de l'indicateur de faible charge" },
    { id: "tip-3", text: "Nettoyez régulièrement l'écran avec un chiffon microfibre sec" },
    { id: "tip-4", text: "Évitez les produits chimiques qui pourraient endommager l'affichage" }
  ];

  const usageScenarios = [
    { id: "scenario-1", scenario: "🏃 Sport & Fitness", benefits: ["Chronomètre intégré", "Résistance à la transpiration", "Léger et ergonomique"] },
    { id: "scenario-2", scenario: "👨‍💼 Professionnel", benefits: ["Discrétion", "Précision absolue", "Alarmes discrètes"] },
    { id: "scenario-3", scenario: "🎒 Voyage", benefits: ["Double fuseau horaire", "Résistance aux chocs", "Autonomie longue"] },
    { id: "scenario-4", scenario: "🔧 Technique", benefits: ["Minuterie de précision", "Affichage numérique clair", "Fonctions avancées"] }
  ];

  return (
    <div className="subcategory-digitale-simple">
      {/* En-tête Hero */}
      <div className="digitale-hero">
        <div className="hero-content">
          <h1>Montres Digitales Simples</h1>
          <p className="hero-subtitle">La précision au premier coup d'œil</p>
          <p className="hero-description">
            Écran simple ou multi-écrans. La montre digitale combine fonctionnalité 
            et modernité pour une expérience horlogère intuitive et précise. 
            Parfaite pour les esprits pratiques et les vies actives.
          </p>
        </div>
      </div>

      {/* Section Caractéristiques */}
      <div className="characteristics-section">
        <h2>L'Essence du Numérique</h2>
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

      {/* Section Types d'Affichage */}
      <div className="display-types-section">
        <h2>Technologies d'Affichage</h2>
        <div className="display-types-grid">
          {displayTypes.map((type) => (
            <div key={type.id} className="display-type-card">
              <h3>{type.name}</h3>
              <p>{type.description}</p>
              <div className="display-features">
                {type.name === "LCD Standard" && "💡 Économique • 📱 Fiable"}
                {type.name === "LED Rétroéclairé" && "🔦 Puissant • 🌙 Nocturne"}
                {type.name === "E-Ink" && "☀️ Solaire • 🔋 Économe"}
                {type.name === "OLED" && "🎨 Contrasté • 🖤 Profond"}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section Fonctions */}
      <div className="functions-section">
        <h2>Fonctions Numériques</h2>
        <div className="functions-grid">
          {digitalFunctions.map((func) => (
            <div key={func.id} className="function-card">
              <div className="function-icon">
                {func.function.includes("Heure") && "🕐"}
                {func.function.includes("Calendrier") && "📅"}
                {func.function.includes("Alarmes") && "⏰"}
                {func.function.includes("Chronomètre") && "⏱️"}
                {func.function.includes("Minuterie") && "🔔"}
                {func.function.includes("Fuseau") && "🌍"}
              </div>
              <div className="function-content">
                <h3>{func.function}</h3>
                <p>{func.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section Technique */}
      <div className="technical-section">
        <h2>Spécifications Techniques</h2>
        <div className="specs-container">
          <div className="spec-group">
            <h3>Électronique</h3>
            <ul>
              <li>Mouvement : Module quartz numérique</li>
              <li>Précision : ±15 secondes/mois</li>
              <li>Pile : Lithium 1.5V ou 3V</li>
              <li>Autonomie : 2-5 ans selon usage</li>
              <li>Affichage : LCD, LED, E-Ink ou OLED</li>
            </ul>
          </div>
          <div className="spec-group">
            <h3>Fonctionnalités</h3>
            <ul>
              <li>Affichage : 12h/24h avec secondes</li>
              <li>Calendrier : Automatique jusqu'en 2099</li>
              <li>Alarmes : 1 à 5 alarmes programmables</li>
              <li>Chronomètre : 1/100e de seconde</li>
              <li>Éclairage : LED ou électroluminescent</li>
            </ul>
          </div>
          <div className="spec-group">
            <h3>Construction</h3>
            <ul>
              <li>Boîtier : Résine, acier ou polymère</li>
              <li>Étanchéité : 5 à 20 ATM</li>
              <li>Verre : Minéral ou résine acrylique</li>
              <li>Bracelet : Silicone, nylon, résine</li>
              <li>Dimensions : Léger et ergonomique</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Section Technologies */}
      <div className="technology-section">
        <h2>Innovations Digitales</h2>
        <div className="technology-grid">
          {technologyFeatures.map((tech) => (
            <div key={tech.id} className="technology-card">
              <h3>{tech.feature}</h3>
              <p>{tech.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Section Scénarios d'Usage */}
      <div className="usage-scenarios-section">
        <h2>Pour Quel Usage ?</h2>
        <div className="scenarios-grid">
          {usageScenarios.map((scenario) => (
            <div key={scenario.id} className="scenario-card">
              <h3>{scenario.scenario}</h3>
              <ul className="benefits-list">
                {scenario.benefits.map((benefit) => (
                  <li key={`${scenario.id}-${benefit}`}>✓ {benefit}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Section Avantages */}
      <div className="advantages-section">
        <h2>Pourquoi Choisir une Digitale ?</h2>
        <div className="advantages-comparison">
          <div className="advantage-column">
            <h3>✅ Avantages Digitale</h3>
            <ul>
              <li>Lecture instantanée et précise</li>
              <li>Fonctions multiples intégrées</li>
              <li>Entretien minimal</li>
              <li>Excellent rapport qualité-prix</li>
              <li>Résistance aux chocs</li>
              <li>Léger et confortable</li>
            </ul>
          </div>
          <div className="advantage-column">
            <h3>🔄 vs Analogique</h3>
            <ul>
              <li>Plus rapide à lire</li>
              <li>Plus de fonctions</li>
              <li>Moins d'entretien</li>
              <li>Plus économique</li>
              <li>Plus robuste</li>
              <li>Plus moderne</li>
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
              Les montres digitales sont réputées pour leur fiabilité, 
              mais quelques bonnes pratiques assurent leur longévité.
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
        <h3>Prêt pour l'efficacité numérique ?</h3>
        <p>Je vous conseille sur la montre digitale qui correspond à votre style de vie et vos besoins.</p>
        <Link to="/contact" className="info-button">Contactez-moi</Link>
      </div>
    </div>
  );
};

export default SubcategoryDigitaleSimple;