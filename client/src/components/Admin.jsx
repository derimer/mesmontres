/* eslint-disable no-alert */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";

export default function Admin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    price: "",
    images: [],
    mouvement: "Automatique",
    materiau_boitier: "Acier inoxydable",
    couleur_cadran: "Noir",
    bracelet: "Bracelet acier",
    resistance_eau: "50m",
    description: "",
    referenceURL: "",
  });

  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [montres, setMontres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("upload");
  const [zoomedImage, setZoomedImage] = useState(null);
  const [contactMessages, setContactMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(true);

  // Vérification de l'authentification
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  // Bouton de déconnexion
  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    localStorage.removeItem("adminEmail");
    navigate("/login");
  };

  // Charger les montres existantes
  const fetchMontres = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/montres`);
      if (res.ok) {
        const data = await res.json();
        setMontres(data);
      } else {
        setFeedbackMessage("Erreur lors du chargement des montres.");
      }
    } catch {
      setFeedbackMessage("Erreur réseau lors du chargement.");
    } finally {
      setLoading(false);
    }
  };
  const fetchMessages = async () => {
    setLoadingMessages(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/contact`);
      if (res.ok) {
        const data = await res.json();
        setContactMessages(data);
      } else {
        setContactMessages([]);
      }
    } catch {
      setContactMessages([]);
    } finally {
      setLoadingMessages(false);
    }
  };
  useEffect(() => {
    fetchMontres();
    fetchMessages();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "images") {
      setFormData({
        ...formData,
        images: [...formData.images, ...Array.from(files)],
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const removeImage = (index) => {
    const newImages = [...formData.images];
    newImages.splice(index, 1);
    setFormData({ ...formData, images: newImages });
  };

  const handleImageClick = (imageSrc) => {
    setZoomedImage(zoomedImage === imageSrc ? null : imageSrc);
  };

  const closeZoom = () => {
    setZoomedImage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedbackMessage("");

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "images") {
        value.forEach((img) => formDataToSend.append("images", img));
      } else {
        formDataToSend.append(key, value);
      }
    });

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/montres`, {
        method: "POST",
        body: formDataToSend,
      });

      if (!res.ok) throw new Error(`Erreur HTTP: ${res.status}`);

      await res.json();
      setFeedbackMessage("Montre ajoutée avec succès !");
      setFormData({
        name: "",
        brand: "",
        price: "",
        images: [],
        mouvement: "Automatique",
        materiau_boitier: "Acier inoxydable",
        couleur_cadran: "Noir",
        bracelet: "Bracelet acier",
        resistance_eau: "50m",
        description: "",
        referenceURL: "",
      });
      setActiveTab("manage");
      await fetchMontres();
    } catch (error) {
      console.error(error);
      setFeedbackMessage(error.message || "Erreur réseau.");
    }
  };

  useEffect(() => {
    if (activeTab === "manage") {
      fetchMontres();
    } else if (activeTab === "messages") {
      fetchMessages();
    }
  }, [activeTab]);

  const deleteMontre = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette montre ?")) {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/montres/${id}`,
          {
            method: "DELETE",
          }
        );
        if (res.ok) {
          setFeedbackMessage("Montre supprimée avec succès !");
          await fetchMontres();
        } else {
          setFeedbackMessage("Erreur lors de la suppression.");
        }
      } catch {
        setFeedbackMessage("Erreur réseau lors de la suppression.");
      }
    }
  };
  const deleteMessage = async (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer ce message ?")) {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/contact/${id}`,
          {
            method: "DELETE",
          }
        );
        if (res.ok) {
          setFeedbackMessage("Message supprimé avec succès !");
          await fetchMessages(); // recharge la liste
        } else {
          setFeedbackMessage("Erreur lors de la suppression du message.");
        }
      } catch {
        setFeedbackMessage("Erreur réseau lors de la suppression du message.");
      }
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1 className="admin-title">Administration des Montres</h1>
        <button type="button" onClick={handleLogout} className="btn-logout">
          Déconnexion
        </button>
      </div>

      <div className="admin-tabs">
        <button
          type="button"
          className={`admin-tab ${activeTab === "upload" ? "active" : ""}`}
          onClick={() => setActiveTab("upload")}
        >
          Ajouter une montre
        </button>
        <button
          type="button"
          className={`admin-tab ${activeTab === "manage" ? "active" : ""}`}
          onClick={() => setActiveTab("manage")}
        >
          Gérer les montres ({montres.length})
        </button>
        <button
          type="button"
          className={`admin-tab ${activeTab === "messages" ? "active" : ""}`}
          onClick={() => setActiveTab("messages")}
        >
          Messages ({contactMessages.length})
        </button>
      </div>

      {feedbackMessage && (
        <div
          className={`alert ${feedbackMessage.includes("succès") ? "alert-success" : "alert-error"}`}
        >
          {feedbackMessage}
        </div>
      )}

      {activeTab === "upload" && (
        <form className="upload-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Référence de la montre :</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="brand">Marque :</label>
            <input
              type="text"
              id="brand"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="price">Prix (€) :</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              min="0"
              step="0.01"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="mouvement">Mouvement :</label>
            <input
              type="text"
              id="mouvement"
              name="mouvement"
              value={formData.mouvement}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="materiau_boitier">Matériau du boîtier :</label>
            <input
              type="text"
              id="materiau_boitier"
              name="materiau_boitier"
              value={formData.materiau_boitier}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="couleur_cadran">Couleur du cadran :</label>
            <input
              type="text"
              id="couleur_cadran"
              name="couleur_cadran"
              value={formData.couleur_cadran}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="bracelet">Bracelet :</label>
            <input
              type="text"
              id="bracelet"
              name="bracelet"
              value={formData.bracelet}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="resistance_eau">Résistance à l'eau :</label>
            <input
              type="text"
              id="resistance_eau"
              name="resistance_eau"
              value={formData.resistance_eau}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="images">Sélectionnez des images :</label>
            <input
              type="file"
              id="images"
              name="images"
              onChange={handleChange}
              multiple
              accept="image/*"
            />
          </div>

          {formData.images.length > 0 && (
            <div className="image-grid">
              {formData.images.map((img, index) => (
                <div
                  key={`${img.name}-${img.lastModified}`}
                  className="image-preview-container"
                >
                  <button
                    type="button"
                    className="image-button"
                    onClick={() => handleImageClick(URL.createObjectURL(img))}
                    style={{
                      padding: 0,
                      border: "none",
                      background: "none",
                      cursor: "pointer",
                    }}
                    aria-label={`Agrandir l'image ${img.name}`}
                  >
                    <img
                      src={URL.createObjectURL(img)}
                      alt={img.name}
                      className="preview-image"
                    />
                  </button>
                  <button
                    type="button"
                    className="btn-delete"
                    onClick={() => removeImage(index)}
                  >
                    ❌
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="referenceURL">URL de référence (optionnel) :</label>
            <input
              type="url"
              id="referenceURL"
              name="referenceURL"
              value={formData.referenceURL}
              onChange={handleChange}
              placeholder="https://exemple.com/montre"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description :</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              required
            />
          </div>

          <button type="submit" className="btn-primary">
            Uploader la montre
          </button>
        </form>
      )}

      {activeTab === "manage" && (
        <div className="montres-list">
          <h2>Montres existantes</h2>
          {loading && <div className="loading">Chargement...</div>}

          {!loading && montres.length === 0 && (
            <div className="empty-state">
              <p>Aucune montre à afficher.</p>
              <button
                type="button"
                className="btn-primary"
                onClick={() => setActiveTab("upload")}
              >
                Ajouter
              </button>
            </div>
          )}

          {!loading && montres.length > 0 && (
            <div className="montres-grid">
              {montres.map((montre) => (
                <div key={montre.id} className="montre-card">
                  <div className="montre-images">
                    {montre.images?.length > 0 ? (
                      <div className="image-grid">
                        {montre.images.map((img) => (
                          <div key={img.id} className="image-preview-container">
                            <button
                              type="button"
                              className="image-button"
                              onClick={() =>
                                handleImageClick(
                                  `${import.meta.env.VITE_API_URL}/uploads/${img.filename}`
                                )
                              }
                              style={{
                                padding: 0,
                                border: "none",
                                background: "none",
                                cursor: "pointer",
                              }}
                              aria-label={`Agrandir l'image de la montre ${montre.name}`}
                            >
                              <img
                                src={`${import.meta.env.VITE_API_URL}/uploads/${img.filename}`}
                                alt={`Vue de la montre ${montre.name}`}
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
                  <div className="montre-info">
                    <h3>{montre.name}</h3>
                    <p className="name1" style={{ color: "gold" }}>
                      Marque : {montre.brand}
                    </p>
                    <p>Prix : {montre.price} €</p>
                    <p>Mouvement : {montre.mouvement}</p>
                    <p>Boîtier : {montre.materiau_boitier}</p>
                    <p>Cadran : {montre.couleur_cadran}</p>
                    <p>Bracelet : {montre.bracelet}</p>
                    <p>Résistance à l'eau : {montre.resistance_eau}</p>
                    <p>{montre.description}</p>
                  </div>
                  <div className="montre-actions">
                    <button
                      type="button"
                      className="btn-delete"
                      onClick={() => deleteMontre(montre.id)}
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "messages" && (
        <div className="contact-messages-list">
          <h2>Messages reçus</h2>
          {loadingMessages && <p>Chargement des messages...</p>}
          {!loadingMessages && contactMessages.length === 0 && (
            <p>Aucun message reçu.</p>
          )}
          {!loadingMessages && contactMessages.length > 0 && (
            <ul>
              {contactMessages.map(
                ({
                  id,
                  name,
                  email,
                  subject,
                  message: messageContent,
                  status,
                  created_at: createdAt,
                }) => (
                  <li key={id} className="contact-message-item">
                    <p>
                      <strong>{name}</strong> ({email})
                    </p>
                    <p>
                      <em>Sujet:</em> {subject} | <em>Statut:</em> {status}
                    </p>
                    <p>
                      <em>Envoyé le:</em> {new Date(createdAt).toLocaleString()}
                    </p>
                    <p>{messageContent}</p>
                    <button
                      type="button"
                      className="btn-delete"
                      onClick={() => deleteMessage(id)}
                    >
                      Supprimer
                    </button>
                  </li>
                )
              )}
            </ul>
          )}
        </div>
      )}

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
            style={{ background: "none", border: "none", padding: 0 }}
          >
            <img
              src={zoomedImage}
              alt="Montre en détail"
              className="zoomed-image"
            />
            <button type="button" className="close-modal" onClick={closeZoom}>
              ×
            </button>
          </button>
        </div>
      )}
    </div>
  );
}
