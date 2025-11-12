import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { 
  SubcategoryMecaniqueSimple,
  SubcategoryAutomatique,
  SubcategoryChronographeMecanique,
  SubcategoryCalendrierPerpetuel,
  SubcategoryKinetic,
  SubcategoryAnalogiqueSimple,
  SubcategoryChronographeQuartz,
  SubcategoryDigitaleSimple,
  SubcategoryMixte

} from "./subcategories";
import "./Subcategories.css";

function GenericSubcategory({ subId }) {
  return (
    <div className="generic-subcategory">
      <div className="generic-hero">
        <div className="hero-content">
          <h1>Sous-catégorie: {subId}</h1>
          <p className="hero-description">Contenu en développement</p>
          <p className="coming-soon">🛠️ Bientôt disponible</p>
        </div>
      </div>

      <div className="generic-content">
        <div className="placeholder-section">
          <h2>En cours de développement</h2>
          <p>Notre équipe travaille sur le contenu de cette section.</p>
        </div>
      </div>
    </div>
  );
}

GenericSubcategory.propTypes = {
  subId: PropTypes.string,
};

GenericSubcategory.defaultProps = {
  subId: "",
};

// Mapping des composants spécifiques - CORRIGEZ ICI
// Mapping des composants spécifiques - CORRIGEZ ICI
function Subcategories() {
  const { subId } = useParams();

  const subcategoryComponents = {
    "mecanique-simple": SubcategoryMecaniqueSimple,
    "automatique": SubcategoryAutomatique,  // ✅ CHANGEZ GenericSubcategory → SubcategoryAutomatique
    "chronographe-mecanique": SubcategoryChronographeMecanique,
    "calendrier-perpetuel": SubcategoryCalendrierPerpetuel,
    "kinetic": SubcategoryKinetic,
    "analogique-simple": SubcategoryAnalogiqueSimple,
    "chronographe-quartz": SubcategoryChronographeQuartz,
    "digitale-simple": SubcategoryDigitaleSimple,
    "mixte": SubcategoryMixte,
  };

  const SubcategoryComponent = subcategoryComponents[subId] || GenericSubcategory;

  return (
    <div className="subcategories-container">
      <SubcategoryComponent subId={subId} />
    </div>
  );
}

export default Subcategories;