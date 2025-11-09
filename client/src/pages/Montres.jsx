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
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/montres`);
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

  // Regrouper les montres par marque
  const montresParMarque = montres.reduce((acc, montre) => {
    const marque = montre.brand || "Autre";
    if (!acc[marque]) {
      acc[marque] = [];
    }
    acc[marque].push(montre);
    return acc;
  }, {});

  // Trier les marques par ordre alphabétique
  const marquesTriees = Object.keys(montresParMarque).sort();

  if (loading) return <p>Chargement des montres...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="montres-container">
      <h1>Mes Montres</h1>
      <p className="intro-text">
        Bienvenue dans la section montres. Chacune d'elles a fait l'objet d'un
        entretien complet et selon son état, des travaux nécessaires, afin de
        vous proposer un garde-temps en parfait état d'aspect et de
        fonctionnement.
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

      {/* Affichage par marque */}
      {marquesTriees.map((marque) => (
        <div key={marque} className="marque-section">
          <h2 className="marque-title">{marque}</h2>
          <div className="montres-grid">
            {montresParMarque[marque].map((montre) => {
              // 🖼️ Sélectionner la première image (position = 0 ou la première du tableau)
              const mainImage =
                montre.images?.find((img) => img.position === 0) ||
                montre.images?.[0];
              const imageSrc = mainImage
                ? `${import.meta.env.VITE_API_URL}/api/uploads/${mainImage.filename}`
                : "/placeholder.jpg";

              return (
                <div key={montre.id} className="montre-card">
                  <div className="montre-image-container">
                    <button
                      type="button"
                      className="montre-image-button"
                      onClick={(e) => handleImageClick(e, imageSrc)}
                      style={{
                        padding: 0,
                        border: "none",
                        background: "none",
                        cursor: "pointer",
                      }}
                      aria-label={`Agrandir l'image de ${montre.brand}`}
                    >
                      <img
                        src={imageSrc}
                        alt={montre.brand}
                        className="montre-image"
                        draggable={false}
                      />
                      <div className="image-overlay">
                        <span className="zoom-hint">📸 Cliquez pour agrandir</span>
                      </div>
                    </button>
                  </div>
                  <Link
                    to={`/montres/${montre.id}`}
                    className="montre-info-link"
                  >
                    <div className="montre-info">
                      <p>Référence : {montre.reference || "N/A"}</p>
                      <p>Prix : {montre.price} €</p>
                      <div className="details-hint">Voir les détails →</div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      ))}

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