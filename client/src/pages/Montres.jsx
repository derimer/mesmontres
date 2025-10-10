import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Montres.css";

export default function Montres() {
  const [montres, setMontres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [zoomedImage, setZoomedImage] = useState(null);
  const [showInstructions, setShowInstructions] = useState(true);

  // Fonctions pour le zoom des images
  const handleImageClick = (e, imageSrc) => {
    e.preventDefault();
    e.stopPropagation();
    setZoomedImage(zoomedImage === imageSrc ? null : imageSrc);
  };

  const closeZoom = () => {
    setZoomedImage(null);
  };

  // Fermer les instructions après 8 secondes
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInstructions(false);
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    async function fetchMontres() {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/montres`);
        if (!res.ok) throw new Error("Erreur lors du chargement des montres");
        const data = await res.json();
        setMontres(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchMontres();
  }, []);

  if (loading) return <p>Chargement des montres...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="montres-container">
      <h1>Mes Montres</h1>
      <p className="intro-text">
        Bienvenue dans la section Montres ! Découvrez ma collection exclusive de
        garde-temps, alliant élégance et précision. Chaque montre est
        soigneusement sélectionnée pour répondre aux goûts les plus raffinés.
        Explorez mes modèles et trouvez la montre parfaite qui complétera votre
        style avec sophistication.
      </p>

      {/* Message d'instructions */}
      {showInstructions && (
        <div className="instructions-banner">
          <div className="instructions-content">
            <span className="instructions-icon">💡</span>
            <div className="instructions-text">
              <strong>Comment naviguer :</strong>
              <span>
                Cliquez sur l'image pour l'agrandir • Cliquez sur le nom pour
                voir les détails
              </span>
            </div>
            <button
              type="button"
              className="close-instructions"
              onClick={() => setShowInstructions(false)}
              aria-label="Fermer les instructions"
            >
              ×
            </button>
          </div>
        </div>
      )}

      <div className="montres-grid">
        {montres.map((montre) => (
          <div key={montre.id} className="montre-card">
            <div className="montre-image-container">
              <button
                type="button"
                className="montre-image-button"
                onClick={(e) =>
                  handleImageClick(
                    e,
                    montre.images && montre.images.length > 0
                      ? `${import.meta.env.VITE_API_URL}/uploads/${montre.images[0].filename}`
                      : "/placeholder.jpg"
                  )
                }
                style={{
                  padding: 0,
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                }}
                aria-label={`Agrandir l'image de ${montre.name}`}
              >
                <img
                  src={
                    montre.images && montre.images.length > 0
                      ? `${import.meta.env.VITE_API_URL}/uploads/${montre.images[0].filename}`
                      : "/placeholder.jpg"
                  }
                  alt={montre.name}
                  className="montre-image"
                  draggable={false}
                />
                {/* Overlay d'information au survol */}
                <div className="image-overlay">
                  <span className="zoom-hint">📸 Cliquez pour agrandir</span>
                </div>
              </button>
            </div>
            <Link to={`/montres/${montre.id}`} className="montre-info-link">
              <div className="montre-info">
                <h3>{montre.name}</h3>
                <p>Marque : {montre.brand}</p>
                <p>Prix : {montre.price} €</p>
                <div className="details-hint">Voir les détails →</div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Modal pour l'image agrandie */}
      {zoomedImage && (
        <div
          className="image-modal"
          onClick={closeZoom}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Escape") closeZoom();
          }}
        >
          <div
            className="image-modal-content"
            role="button"
            tabIndex={0}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => {
              e.stopPropagation();
            }}
          >
            <button
              type="button"
              className="zoomed-image-button"
              onClick={closeZoom}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") closeZoom();
              }}
              style={{
                padding: 0,
                border: "none",
                background: "none",
                cursor: "pointer",
              }}
              aria-label="Fermer l'image agrandie"
            >
              <img
                src={zoomedImage}
                alt="Montre agrandie"
                className="zoomed-image"
                draggable={false}
              />
            </button>
            <button type="button" className="close-modal" onClick={closeZoom}>
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
