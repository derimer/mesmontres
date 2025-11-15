import { Link } from "react-router-dom";
import "./SubcategoryChronographeMecanique.css";

function SubcategoryChronographeMecanique() {
  const characteristics = [
    {
      id: "complication-chronographe",
      title: "Complication Chronographe",
      description: "Fonction de chronomètre intégrée pour mesurer des temps courts",
      icon: "⏱️"
    },
    {
      id: "commandes-poussoirs", 
      title: "Commandes Poussoirs",
      description: "Poussoirs pour démarrer, arrêter et remettre à zéro le chrono",
      icon: "⚡"
    },
    {
      id: "compteurs-registres",
      title: "Compteurs Registres",
      description: "Cadrans supplémentaires pour minutes, heures et secondes",
      icon: "🎯"
    },
    {
      id: "mouvement-colonne-roue",
      title: "Colonne de Roue",
      description: "Système de commande précis pour les séquences chrono",
      icon: "⚙️"
    }
  ];

  const functions = [
    { id: "func-1", title: "Mesure du temps écoulé", description: "Capacité à chronométrer des événements jusqu'à 12 heures" },
    { id: "func-2", title: "Tachyomètre", description: "Mesure de vitesses sur une base de 1000 mètres" },
    { id: "func-3", title: "Télémètre", description: "Mesure de distances à partir du son" },
    { id: "func-4", title: "Pulsomètre", description: "Mesure du rythme cardiaque" }
  ];

  const maintenanceTips = [
    { id: "tip-1", text: "Évitez d'actionner les poussoirs sous l'eau ou en milieu humide" },
    { id: "tip-2", text: "Ne laissez pas le chronographe en marche en permanence pour économiser l'énergie" },
    { id: "tip-3", text: "Faites réviser régulièrement le mécanisme de chronographe, plus sensible à l'usure" },
    { id: "tip-4", text: "Utilisez les poussoirs avec une pression ferme mais sans force excessive" }
  ];

  return (
    <div className="subcategory-chronographe-mecanique">
       <div className="imgmeca">
        <img 
          src="/images/montreChronographeSimple.jpg" 
          alt="Montre mécanique simple - horlogerie traditionnelle" 
        />
      </div>
      {/* En-tête Hero */}
      <div className="chronographe-hero">
        <div className="hero-content">
          <h1>Chronographes Mécaniques</h1>
          <p className="hero-subtitle">L'art de mesurer le temps</p>
          <p className="hero-description">
            Avec cadrans minutes, secondes et heures sur 24h. Le chronographe mécanique 
            incarne l'excellence technique horlogère, alliant précision mesurée 
            et complexité mécanique raffinée.
          </p>
        </div>
      </div>

      {/* Section Caractéristiques */}
      <div className="characteristics-section">
        <h2>Caractéristiques du Chronographe</h2>
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

      {/* Section Fonctions */}
      <div className="functions-section">
        <h2>Fonctions de Mesure</h2>
        <div className="functions-grid">
          {functions.map((func) => (
            <div key={func.id} className="function-card">
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
            <h3>Mouvement Chronographe</h3>
            <ul>
              <li>Type : Mécanique à remontage manuel ou automatique</li>
              <li>Colonne de roue : Système de commande séquentielle</li>
              <li>Poussoirs : 2 ou 3 selon la complexité</li>
              <li>Compteurs : 2 à 4 registres (30min, 12h, secondes continues)</li>
            </ul>
          </div>
          <div className="spec-group">
            <h3>Précision et Mesure</h3>
            <ul>
              <li>Fréquence : 18 000 à 36 000 alternances/heure</li>
              <li>Précision chrono : 1/8e à 1/10e de seconde</li>
              <li>Capacité mesure : 30 minutes à 12 heures</li>
              <li>Retour à zéro : Instantané ou flyback</li>
            </ul>
          </div>
          <div className="spec-group">
            <h3>Complications</h3>
            <ul>
              <li>Échelles : Tachyomètre, télémètre, pulsomètre</li>
              <li>Affichage : Date, phase de lune, réserve de marche</li>
              <li>Matériaux : Acier, laiton, or pour les composants</li>
              <li>Finitions : Anglage, polissage, côtes de Genève</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Section Utilisation */}
      <div className="usage-section">
        <h2>Utilisation du Chronographe</h2>
        <div className="usage-steps">
          <div className="usage-step">
            <span className="step-number">1</span>
            <div className="step-content">
              <h4>Démarrage</h4>
              <p>Appuyez sur le poussoir supérieur pour lancer la mesure du temps</p>
            </div>
          </div>
          <div className="usage-step">
            <span className="step-number">2</span>
            <div className="step-content">
              <h4>Arrêt</h4>
              <p>Appuyez à nouveau sur le poussoir supérieur pour stopper la mesure</p>
            </div>
          </div>
          <div className="usage-step">
            <span className="step-number">3</span>
            <div className="step-content">
              <h4>Remise à zéro</h4>
              <p>Appuyez sur le poussoir inférieur pour réinitialiser les aiguilles</p>
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
              Un chronographe mécanique est une pièce d'horlogerie complexe 
              qui nécessite un entretien attentif pour préserver ses performances.
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
        <h2>Pourquoi un Chronographe Mécanique ?</h2>
        <div className="advantages-grid">
          <div className="advantage-card">
            <h3>✅ Polyvalence Technique</h3>
            <p>Instrument de mesure précis pour le sport, la science et la vie quotidienne</p>
          </div>
          <div className="advantage-card">
            <h3>✅ Complexité Appréciée</h3>
            <p>L'une des complications les plus admirées par les connaisseurs horlogers</p>
          </div>
          <div className="advantage-card">
            <h3>✅ Héritage Sportif</h3>
            <p>Histoire riche liée à l'aviation, l'automobile et le sport professionnel</p>
          </div>
          <div className="advantage-card">
            <h3>✅ Valeur de Collection</h3>
            <p>Pièces recherchées qui prennent de la valeur avec le temps</p>
          </div>
        </div>
      </div>

      {/* CTA Informative */}
      <div className="info-cta">
        <h3>Passionné par les chronographes mécaniques ?</h3>
        <p>Je vous guide dans le choix d'un chronographe adapté à vos besoins et à votre style.</p>
       <Link to="/contact" className="info-button">Contactez-moi</Link>
      </div>
    </div>
  );
};

export default SubcategoryChronographeMecanique;