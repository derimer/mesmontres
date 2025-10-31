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

  // Fonctions pour le carousel
  const nextImage = () => {
    if (montre.images && montre.images.length > 0) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === montre.images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const prevImage = () => {
    if (montre.images && montre.images.length > 0) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? montre.images.length - 1 : prevIndex - 1
      );
    }
  };

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
        {/* Section Images avec Carousel Simple */}
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
                  <img
                    src={`${import.meta.env.VITE_API_URL}/api/uploads/${montre.images[currentImageIndex].filename}`}
                    alt={`${montre.name} - Vue ${currentImageIndex + 1}`}
                    className="carousel-image"
                  />
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
            </div>
          ) : (
            <p className="no-image">Aucune image disponible</p>
          )}
        </div>

        {/* Section Caractéristiques (inchangée) */}
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
                <span className="info-label">Résistance à l'eau :</span>
                <span className="info-value">{montre.resistance_eau}</span>
              </div>
            </div>

            <div className="description-section">
              <h3>Description</h3>
              <p>{montre.description}</p>
            </div>

            {/* Bouton acheter */}
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
    </div>
  );
}
