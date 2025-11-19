import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Montres.css";

export default function Montres() {
  const [montres, setMontres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [zoomedImage, setZoomedImage] = useState(null);
  const [showInstructions, setShowInstructions] = useState(true);

  const location = useLocation();
  const fromMontreId = location.state?.fromMontreId || null;

  // Zoom image
  const handleImageClick = (e, imageSrc) => {
    e.preventDefault();
    e.stopPropagation();
    setZoomedImage(zoomedImage === imageSrc ? null : imageSrc);
  };

  const closeZoom = () => {
    setZoomedImage(null);
  };

  // Cache le message d’instructions après 8 sec
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInstructions(false);
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  // Récupération des montres
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

  // 👉 Scroll automatique vers la montre d’où l’on revient
  useEffect(() => {
    if (fromMontreId && montres.length > 0) {
      const element = document.getElementById(`montre-${fromMontreId}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [fromMontreId, montres]);

  // Regroupement par marque
  const montresParMarque = montres.reduce((acc, montre) => {
    const marque = montre.brand || "Autre";
    if (!acc[marque]) acc[marque] = [];
    acc[marque].push(montre);
    return acc;
  }, {});

  // Tri par nombre
// Fonction qui donne un ordre spécial à chaque marque
const getOrder = (marque) => {
  const m = marque.trim().toLowerCase();

  if (m === "autres" || m === "autre") return 3; // dernière position
  if (m === "junior") return 2;                  // avant-dernière
  return 1;                                      // toutes les autres en premier
};

// Tri final : ordre > puis nombre de montres
const marquesTriees = Object.entries(montresParMarque)
  .sort(([marqueA, montresA], [marqueB, montresB]) => {
    const orderA = getOrder(marqueA);
    const orderB = getOrder(marqueB);

    // D'abord trier selon l'ordre spécial
    if (orderA !== orderB) return orderA - orderB;

    // Sinon trier par nombre de montres décroissant
    return montresB.length - montresA.length;
  })
  .map(([marque, montresList]) => ({
    marque,
    montres: montresList,
    count: montresList.length,
  }));


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

      {/* Bannière d'instructions */}
      {showInstructions && (
        <div className="instructions-banner">
          <div className="instructions-content">
            <span className="instructions-icon">💡</span>
            <div className="instructions-text">
              <strong>Comment naviguer :</strong>
              <span>
                Cliquez sur l'image pour l'agrandir • Cliquez sur le prix pour
                voir les détails
              </span>
            </div>
            <button
              type="button"
              className="close-instructions"
              onClick={() => setShowInstructions(false)}
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Affichage des montres */}
      {marquesTriees.map(({ marque, montres: montresList, count }) => (
        <div key={marque} className="marque-section">
          <div className="marque-wrapper">
            <h2 className="marque-title">
              {marque}{" "}
              <span className="montre-count">
                ({count} modèle{count > 1 ? "s" : ""})
              </span>
            </h2>

            <div className="montres-grid">
              {montresList.map((montre) => {
                const mainImage =
                  montre.images?.find((img) => img.position === 0) ||
                  montre.images?.[0];
                const imageSrc = mainImage
                  ? `${import.meta.env.VITE_API_URL}/api/uploads/${mainImage.filename}`
                  : "/placeholder.jpg";

                return (
                  <div
                    key={montre.id}
                    id={`montre-${montre.id}`} // ⭐ ID ajouté ici
                    className="montre-card"
                  >
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
                      >
                        <img
                          src={imageSrc}
                          alt={montre.brand}
                          className="montre-image"
                          draggable={false}
                        />
                        <div className="image-overlay">
                          <span className="zoom-hint">
                            📸 Cliquez pour agrandir
                          </span>
                        </div>
                      </button>
                    </div>

                    <Link
                      to={`/montres/${montre.id}`}
                      state={{ fromMontreId: montre.id }}
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
        </div>
      ))}

      {/* Modal zoom */}
      {zoomedImage && (
        <div
          className="image-modal"
          onClick={closeZoom}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            // Allow keyboard users to close the modal with Enter, Space or Escape
            if (
              e.key === "Enter" ||
              e.key === " " ||
              e.key === "Spacebar" ||
              e.key === "Escape"
            ) {
              e.preventDefault();
              e.stopPropagation();
              closeZoom();
            }
          }}
        >
          <div
            className="image-modal-content"
            role="button"
            tabIndex={0}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => {
              // Allow keyboard users to stop propagation (Enter or Space)
              if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
                e.preventDefault();
                e.stopPropagation();
              }
            }}
          >
            <button
              type="button"
              className="zoomed-image-button"
              onClick={closeZoom}
              style={{
                padding: 0,
                border: "none",
                background: "none",
                cursor: "pointer",
              }}
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
