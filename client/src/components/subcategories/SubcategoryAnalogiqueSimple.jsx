import { Link } from "react-router-dom";
import "./SubcategoryAnalogiqueSimple.css";

function SubcategoryAnalogiqueSimple() {
  const characteristics = [
    {
      id: "affichage-traditionnel",
      title: "Affichage Traditionnel",
      description: "Cadran avec aiguilles pour une lecture classique et élégante",
      icon: "🕐"
    },
    {
      id: "precision-quartz", 
      title: "Précision Quartz",
      description: "Exactitude de ±15 secondes par mois garantie",
      icon: "🎯"
    },
    {
      id: "facilite-entretien",
      title: "Facilité d'Entretien",
      description: "Pile longue durée (2-3 ans) et maintenance simple",
      icon: "🔧"
    },
    {
      id: "accessibilite",
      title: "Accessibilité",
      description: "Excellent rapport qualité-prix pour tous les budgets",
      icon: "💫"
    }
  ];

  const watchStyles = [
    { id: "style-1", name: "Classique Élégant", description: "Cadran sobre, aiguilles fines, cuir véritable" },
    { id: "style-2", name: "Sport Chic", description: "Cadran contrasté, index luminescents, acier inoxydable" },
    { id: "style-3", name: "Minimaliste", description: "Design épuré, peu d'index, couleurs neutres" },
    { id: "style-4", name: "Vintage", description: "Chiffres arabes, aiguilles Breguet, tons sépia" }
  ];

  const maintenanceTips = [
    { id: "tip-1", text: "Remplacez la pile dès les premiers signes de ralentissement" },
    { id: "tip-2", text: "Évitez l'exposition aux champs magnétiques intenses" },
    { id: "tip-3", text: "Nettoyez régulièrement le boîtier et le bracelet avec un chiffon doux" },
    { id: "tip-4", text: "Faites vérifier l'étanchéité tous les 2 ans si utilisée dans l'eau" }
  ];

  const quartzAdvantages = [
    { id: "adv-1", title: "Fiabilité", description: "Fonctionnement stable dans toutes les conditions" },
    { id: "adv-2", title: "Robustesse", description: "Résiste mieux aux chocs que les mécaniques" },
    { id: "adv-3", title: "Précision", description: "Exactitude constante sans réglage" },
    { id: "adv-4", title: "Polyvalence", description: "Convient à tous les styles de vie" }
  ];

  return (
    <div className="subcategory-analogique-simple">
      {/* En-tête Hero */}
      <div className="analogique-hero">
        <div className="hero-content">
          <h1>Montres Analogiques Simples Quartz</h1>
          <p className="hero-subtitle">L'élégance intemporelle, la précision moderne</p>
          <p className="hero-description">
            Deux aiguilles + trotteuse. L'alliance parfaite entre le charme de l'affichage 
            traditionnel et la fiabilité de la technologie quartz. Simplicité, élégance 
            et précision pour la vie de tous les jours.
          </p>
        </div>
      </div>

      {/* Section Caractéristiques */}
      <div className="characteristics-section">
        <h2>L'Essentiel du Quartz Analogique</h2>
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

      {/* Section Styles */}
      <div className="styles-section">
        <h2>Styles Disponibles</h2>
        <div className="styles-grid">
          {watchStyles.map((style) => (
            <div key={style.id} className="style-card">
              <h3>{style.name}</h3>
              <p>{style.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Section Avantages Quartz */}
      <div className="quartz-advantages-section">
        <h2>Pourquoi Choisir le Quartz ?</h2>
        <div className="advantages-grid">
          {quartzAdvantages.map((advantage) => (
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
            <h3>Mouvement Quartz</h3>
            <ul>
              <li>Type : Oscillateur à cristal de quartz</li>
              <li>Fréquence : 32 768 Hz</li>
              <li>Précision : ±15 secondes/mois</li>
              <li>Pile : Lithium 1.5V (2-3 ans)</li>
            </ul>
          </div>
          <div className="spec-group">
            <h3>Affichage</h3>
            <ul>
              <li>Configuration : 2 aiguilles + trotteuse</li>
              <li>Cadran : Laqué, guilloché ou métallisé</li>
              <li>Index : Bâtons, chiffres romains ou arabes</li>
              <li>Luminosité : Super-LumiNova ou Tritium</li>
            </ul>
          </div>
          <div className="spec-group">
            <h3>Fonctionnalités</h3>
            <ul>
              <li>Étanchéité : 3 à 10 ATM selon modèles</li>
              <li>Verre : Minéral, saphir ou organique</li>
              <li>Bracelet : Cuir, acier, nylon ou caoutchouc</li>
              <li>Date : Cadran à 3h ou 6h (optionnel)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Section Fonctionnement Quartz */}
      <div className="quartz-operation-section">
        <h2>Le Miracle du Quartz</h2>
        <div className="operation-content">
          <div className="operation-step">
            <div className="step-icon">⚡</div>
            <div className="step-content">
              <h4>Énergie Électrique</h4>
              <p>La pile fournit un courant constant au circuit électronique</p>
            </div>
          </div>
          <div className="operation-step">
            <div className="step-icon">💎</div>
            <div className="step-content">
              <h4>Oscillation du Cristal</h4>
              <p>Le quartz vibre à 32 768 Hz précisément sous l'effet piézoélectrique</p>
            </div>
          </div>
          <div className="operation-step">
            <div className="step-icon">⚙️</div>
            <div className="step-content">
              <h4>Contrôle du Moteur</h4>
              <p>Le circuit divise la fréquence et impulse le moteur pas-à-pas</p>
            </div>
          </div>
          <div className="operation-step">
            <div className="step-icon">🕐</div>
            <div className="step-content">
              <h4>Mouvement des Aiguilles</h4>
              <p>Le moteur fait avancer les aiguilles par impulsions régulières</p>
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
              Une montre quartz analogique simple demande peu d'entretien 
              mais quelques bonnes pratiques assurent sa longévité.
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

      {/* Section Choix */}
      <div className="choice-section">
        <h2>Pour Qui ?</h2>
        <div className="choice-grid">
          <div className="choice-card">
            <h3>👨‍💼 Professionnel</h3>
            <p>Élégance discrète et ponctualité pour le bureau</p>
          </div>
          <div className="choice-card">
            <h3>🎓 Premier Achat</h3>
            <p>Accessible, fiable, parfaite pour débuter en horlogerie</p>
          </div>
          <div className="choice-card">
            <h3>🚀 Vie Active</h3>
            <p>Robuste, précise, adaptée au rythme quotidien</p>
          </div>
          <div className="choice-card">
            <h3>🎁 Cadeau</h3>
            <p>Choix sûr qui convient à tous les goûts et âges</p>
          </div>
        </div>
      </div>

      {/* CTA Informative */}
    <div className="info-cta">
        <h3>En recherche d'une montre quartz fiable et élégante ?</h3>
        <p>Je vous guide vers le modèle qui correspond à votre style et votre budget.</p>

        <Link to="/contact" className="info-button">
          Contactez-moi
        </Link>
      </div>
    </div>
  );
};

export default SubcategoryAnalogiqueSimple;