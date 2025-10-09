import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Montredetail.css";

export default function MontreDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [montre, setMontre] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [zoomedImage, setZoomedImage] = useState(null);

  // Fonctions pour le zoom des images
  const handleImageClick = (imageSrc) => {
    setZoomedImage(zoomedImage === imageSrc ? null : imageSrc);
  };

  const closeZoom = () => {
    setZoomedImage(null);
  };

  useEffect(() => {
    async function fetchMontre() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/montres/${id}`
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

  if (loading) return <p>Chargement...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!montre) return null;

  return (
    <div className="montre-detail">
      <div className="montre-detail-header">
        <h1>{montre.name}</h1>
        <p className="montre-brand">{montre.brand}</p>
      </div>

      <div className="montre-detail-content">
        {/* Section Images */}
        <div className="montre-images-section">
          <h2>Images de la montre</h2>
          {montre.images && montre.images.length > 0 ? (
            <div className="image-grid">
              {montre.images.map((image, index) => (
                <div
                  key={image.id || index}
                  className="image-preview-container"
                >
                  <button
                    type="button"
                    className="image-button"
                    onClick={() =>
                      handleImageClick(
                        `${import.meta.env.VITE_API_URL}/uploads/${image.filename}`
                      )
                    }
                    style={{
                      padding: 0,
                      border: "none",
                      background: "none",
                      cursor: "pointer",
                    }}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        handleImageClick(
                          `${import.meta.env.VITE_API_URL}/uploads/${image.filename}`
                        );
                      }
                    }}
                    aria-label={`Agrandir l'image ${index + 1} de ${montre.name}`}
                  >
                    <img
                      src={`${import.meta.env.VITE_API_URL}/uploads/${image.filename}`}
                      alt={`${montre.name} - Vue ${index + 1}`}
                      className="preview-image"
                    />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-image">Aucune image disponible</p>
          )}
        </div>

        {/* Section Caractéristiques */}
        <div className="montre-info-section">
          <h2>Caractéristiques</h2>
          <div className="montre-info-card">
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Marque :</span>
                <span className="info-value">{montre.brand}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Prix :</span>
                <span className="info-value price">{montre.price} €</span>
              </div>
              <div className="info-item">
                <span className="info-label">Mouvement :</span>
                <span className="info-value">{montre.mouvement}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Matériau boîtier :</span>
                <span className="info-value">{montre.materiau_boitier}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Couleur cadran :</span>
                <span className="info-value">{montre.couleur_cadran}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Bracelet :</span>
                <span className="info-value">{montre.bracelet}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Étanchéité :</span>
                <span className="info-value">{montre.etancheite}</span>
              </div>
            </div>

            <div className="description-section">
              <h3>Description</h3>
              <p className="description-text">{montre.description}</p>
            </div>

            {/* Bouton acheter */}
            <button
              type="button"
              className="btn-buy"
              onClick={() => navigate(`/validation-commande/${id}`)} // ← AJOUT DE L'ID
            >
              Acheter Maintenant - {montre.price} €
            </button>
          </div>
        </div>
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
          <button
            type="button"
            className="image-modal-content"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => {
              if (e.key === "Escape") closeZoom();
            }}
            tabIndex={0}
            aria-label="Contenu du modal d'image agrandie"
            style={{
              background: "none",
              border: "none",
              padding: 0,
              width: "100%",
            }}
          >
            <button
              type="button"
              className="zoomed-image-button"
              onClick={closeZoom}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " " || e.key === "Escape")
                  closeZoom();
              }}
              tabIndex={0}
              aria-label="Fermer l'image agrandie"
              style={{
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
              }}
            >
              <img
                src={zoomedImage}
                alt="Montre agrandie"
                className="zoomed-image"
                style={{ pointerEvents: "none" }}
              />
              <span className="close-modal" aria-hidden="true">
                ×
              </span>
            </button>
          </button>
        </div>
      )}
    </div>
  );
}
