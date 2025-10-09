// Subcategories.jsx (Version légèrement renforcée)
import { useLocation, useParams } from "react-router-dom";

function Subcategories() {
  const location = useLocation();
  const { subId } = useParams();

  // Récupère la sous-catégorie envoyée via le state du <Link>
  const subcategory = location.state?.subcategory;

  if (!subcategory) {
    return (
      <div className="subcategory-page">
        <h2>Sous-catégorie introuvable</h2>
        <p>ID demandé : {subId}</p>
      </div>
    );
  }

  return (
    <div className="subcategory-page">
      <h2>{subcategory.name}</h2>
      <img
        src={subcategory.image}
        alt={subcategory.name}
        className="subcategory-detail-image"
      />
      <p>{subcategory.description}</p>
      <p>
        <strong>Nombre de modèles :</strong> {subcategory.count}
      </p>
    </div>
  );
}

export default Subcategories;
