import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Montredetail.css";

export default function MontreDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [montre, setMontre] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [zoomedImage, setZoomedImage] = useState(null);

  // 🌀 Carousel
  const nextImage = () => {
    if (montre?.images?.length > 0) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === montre.images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const prevImage = () => {
    if (montre?.images?.length > 0) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? montre.images.length - 1 : prevIndex - 1
      );
    }
  };

  // 🔄 Chargement des données
  useEffect(() => {
    async function fetchMontre() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/montres/${id}`
        );
        if (!res.ok) throw new Error("Montre non trouvée");
        const data = await res.json();
        setMontre(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchMontre();
  }, [id]);

  // Gestion de la fermeture avec la touche Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setZoomedImage(null);
      }
    };

    if (zoomedImage) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [zoomedImage]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!montre) return null;

  const currentImageSrc = montre.images?.[currentImageIndex]
    ? `${import.meta.env.VITE_API_URL}/api/uploads/${montre.images[currentImageIndex].filename}`
    : null;

  return (
    <div className="montre-detail">
      <div className="montre-detail-header">
        <h1>{montre.name}</h1>
        <p className="montre-brand">{montre.brand}</p>
      </div>

      <div className="montre-detail-content">
        {/* 🖼️ Section Images avec Carousel */}
        <div className="montre-images-section">
          <h2>Images de la montre</h2>
          {montre.images && montre.images.length > 0 ? (
            <div className="image-carousel">
              <div className="carousel-navigation">
                <button
                  type="button"
                  className="nav-btn prev-btn"
                  onClick={prevImage}
                  aria-label="Image précédente"
                >
                  ‹
                </button>

                <div className="main-image-wrapper">
                  <button
                    type="button"
                    onClick={() => setZoomedImage(currentImageSrc)}
                    className="image-button"
                    style={{
                      background: "none",
                      border: "none",
                      padding: 0,
                      cursor: "zoom-in",
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    aria-label={`Agrandir l'image ${currentImageIndex + 1} de ${montre.name}`}
                  >
                    <img
                      src={currentImageSrc}
                      alt={`${montre.name} - Vue ${currentImageIndex + 1}`}
                      className="carousel-image"
                    />
                  </button>
                </div>

                <button
                  type="button"
                  className="nav-btn next-btn"
                  onClick={nextImage}
                  aria-label="Image suivante"
                >
                  ›
                </button>
              </div>

              {/* Indicateur d'image */}
              <div className="carousel-indicator">
                {currentImageIndex + 1} / {montre.images.length}
              </div>
            </div>
          ) : (
            <p className="no-image">Aucune image disponible</p>
          )}
        </div>

        {/* 📜 Section Caractéristiques */}
        <div className="montre-info-section">
          <h2>Caractéristiques</h2>
          <div className="montre-info-card">
            <div className="montre-infos">
              <p>Référence : {montre.reference}</p>
              <p>Marque : {montre.brand}</p>
              <p>Type : {montre.type}</p>
              <p>Type de mouvement : {montre.type_de_mouvement}</p>
              <p>Origine du mouvement : {montre.origine_mouvement}</p>
              <p>Mouvement : {montre.mouvement}</p>
              <p>Matériau boîtier : {montre.materiau_boitier}</p>
              <p>Couleur cadran : {montre.couleur_cadran}</p>
              <p>Bracelet : {montre.bracelet}</p>
              <p>Résistance à l'eau : {montre.resistance_eau}</p>
              <p>Prix : {montre.price} €</p>
            </div>

            <div className="description-section">
              <h3>Description</h3>
              <p>{montre.description}</p>
            </div>

            {/* 🛒 Bouton Acheter */}
            <button
              type="button"
              className="btn-buy"
              onClick={() => navigate(`/validation-commande/${id}`)}
            >
              Acheter Maintenant - {montre.price} €
            </button>
          </div>
        </div>
      </div>

      {/* Modal plein écran pour le zoom */}
      {/* Modal plein écran pour le zoom */}
      {zoomedImage && (
        <div
          className="image-modal"
          onClick={() => setZoomedImage(null)}
          role="button"
          tabIndex={0}
          aria-label="Fermer la vue agrandie"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              setZoomedImage(null);
            }
          }}
        >
          <button
            type="button"
            className="image-modal-content"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => {
              if (e.key === "Escape") setZoomedImage(null);
            }}
            style={{ background: "none", border: "none", padding: 0 }}
          >
            <img
              src={zoomedImage}
              alt={`${montre.name} - Vue agrandie`}
              className="zoomed-image"
            />
            <button
              type="button"
              className="close-modal"
              onClick={() => setZoomedImage(null)}
              aria-label="Fermer"
            >
              ×
            </button>
          </button>
        </div>
      )}
    </div>
  );
}
