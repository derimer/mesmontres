/* eslint-disable no-alert */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { motion } from "framer-motion";

import "./Admin.css";

export default function Admin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    reference: "",
    brand: "",
    type: "Classique",
    type_de_mouvement: "Automatique",
    origine_mouvement: "Suisse",
    price: "",
    images: [],
    mouvement: "Automatique",
    materiau_boitier: "Acier inoxydable",
    couleur_cadran: "Noir",
    bracelet: "Bracelet acier",
    resistance_eau: "3 ATM",
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
  const [editingMontre, setEditingMontre] = useState(null); // Nouvel état pour la montre en cours d'édition
  const [existingImages, setExistingImages] = useState([]); // Pour gérer les images existantes lors de l'édition

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
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/montres`);
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
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`);
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

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

// Fonction qui envoie la mise à jour au backend
const updateImageOrder = async (newOrder) => {
  try {
    await fetch(`${import.meta.env.VITE_API_URL}/api/images/reorder`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imagesOrder: newOrder }),
    });
    console.info("✅ Ordre mis à jour sur le serveur !");
  } catch (err) {
    console.error("❌ Erreur mise à jour ordre :", err);
  }
};
  const handleDeleteImage = async (imageId, index) => {
    try {
      // 🗑️ Supprimer dans la base via API
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/images/${imageId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        console.info(`✅ Image ${imageId} supprimée du serveur`);
        // 🧹 Supprimer aussi du state React local
        const newExistingImages = [...existingImages];
        newExistingImages.splice(index, 1);
        setExistingImages(newExistingImages);
      } else {
        console.error("Erreur lors de la suppression :", response.status);
      }
    } catch (err) {
      console.error("Erreur réseau lors de la suppression :", err);
    }
  };
const handleDragEnd = async (result) => {
  if (!result.destination) return;

  // Utilise la fonction utilitaire reorder pour éviter la duplication
  const reordered = reorder(existingImages, result.source.index, result.destination.index);

  // 🔁 Met à jour localement l’ordre des images
  setExistingImages(reordered);

  // 🧩 Crée la payload à envoyer au backend
  const imagesOrder = reordered.map((img, index) => ({
    id: img.id,
    position: index,
  }));

  try {
    // Utilise la fonction réutilisable pour envoyer la mise à jour au serveur
    await updateImageOrder(imagesOrder);
  } catch (err) {
    console.error("❌ Erreur lors de la mise à jour de l’ordre :", err);
  }
};

  const handleImageClick = (imageSrc) => {
    setZoomedImage(zoomedImage === imageSrc ? null : imageSrc);
  };

  const closeZoom = () => {
    setZoomedImage(null);
  };

  // Fonction pour initialiser l'édition d'une montre
  const startEditing = (montre) => {
    setEditingMontre(montre);
    setExistingImages(montre.images || []);

    setFormData({
      reference: montre.reference || "",
      brand: montre.brand || "",
      type: montre.type || "Classique",
      type_de_mouvement: montre.type_de_mouvement || "Automatique",
      origine_mouvement: montre.origine_mouvement || "Suisse",
      price: montre.price || "",
      images: [],
      mouvement: montre.mouvement || "Automatique",
      materiau_boitier: montre.materiau_boitier || "Acier inoxydable",
      couleur_cadran: montre.couleur_cadran || "Noir",
      bracelet: montre.bracelet || "Bracelet acier",
      resistance_eau: montre.resistance_eau || "3 ATM",
      description: montre.description || "",
      referenceURL: montre.referenceURL || "",
    });

    setActiveTab("upload");
    setFeedbackMessage(
      `Édition de la montre: ${montre.reference || montre.name}`
    );
  };

  // Fonction pour annuler l'édition
  const cancelEditing = () => {
    setEditingMontre(null);
    setExistingImages([]);
    setFormData({
      reference: "",
      brand: "",
      type: "Classique",
      type_de_mouvement: "Automatique",
      origine_mouvement: "Suisse",
      price: "",
      images: [],
      mouvement: "Automatique",
      materiau_boitier: "Acier inoxydable",
      couleur_cadran: "Noir",
      bracelet: "Bracelet acier",
      resistance_eau: "3 ATM",
      description: "",
      referenceURL: "",
    });
    setFeedbackMessage("Édition annulée.");
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

    // Ajouter les images existantes qui n'ont pas été supprimées
    existingImages.forEach((img) => {
      formDataToSend.append("existingImages", JSON.stringify(img));
    });

    try {
      let res;

      if (editingMontre) {
        for (let pair of formDataToSend.entries()) {
  console.log("➡️", pair[0], pair[1]);
}
// Mode édition - PUT
        res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/montres/${editingMontre.id}`,
          {
            method: "PUT",
            body: formDataToSend,
          }
        );
      } else {
        // Mode création - POST
        res = await fetch(`${import.meta.env.VITE_API_URL}/api/montres`, {
          method: "POST",
          body: formDataToSend,
        });
      }

      if (!res.ok) throw new Error(`Erreur HTTP: ${res.status}`);

      await res.json();
      setFeedbackMessage(
        editingMontre
          ? "Montre modifiée avec succès !"
          : "Montre ajoutée avec succès !"
      );

      // Réinitialisation
      setFormData({
        reference: "",
        brand: "",
        type: "Classique",
        type_de_mouvement: "Automatique",
        origine_mouvement: "Suisse",
        price: "",
        images: [],
        mouvement: "Automatique",
        materiau_boitier: "Acier inoxydable",
        couleur_cadran: "Noir",
        bracelet: "Bracelet acier",
        resistance_eau: "3 ATM",
        description: "",
        referenceURL: "",
      });
      setEditingMontre(null);
      setExistingImages([]);

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
          `${import.meta.env.VITE_API_URL}/api/montres/${id}`,
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
          `${import.meta.env.VITE_API_URL}/api/contact/${id}`,
          {
            method: "DELETE",
          }
        );
        if (res.ok) {
          setFeedbackMessage("Message supprimé avec succès !");
          await fetchMessages();
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
        <h1 className="admin-title">
          {editingMontre ? "Modifier une montre" : "Administration des Montres"}
        </h1>
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
          {editingMontre ? "Modifier la montre" : "Ajouter une montre"}
        </button>
        <button
          type="button"
          className={`admin-tab ${activeTab === "manage" ? "active" : ""}`}
          onClick={() => {
            if (editingMontre) {
              if (
                window.confirm(
                  "Voulez-vous annuler les modifications en cours ?"
                )
              ) {
                cancelEditing();
                setActiveTab("manage");
              }
            } else {
              setActiveTab("manage");
            }
          }}
        >
          Gérer les montres ({montres.length})
        </button>
        <button
          type="button"
          className={`admin-tab ${activeTab === "messages" ? "active" : ""}`}
          onClick={() => {
            if (editingMontre) {
              if (
                window.confirm(
                  "Voulez-vous annuler les modifications en cours ?"
                )
              ) {
                cancelEditing();
                setActiveTab("messages");
              }
            } else {
              setActiveTab("messages");
            }
          }}
        >
          Messages ({contactMessages.length})
        </button>
      </div>

      {feedbackMessage && (
        <div
          className={`alert ${
            feedbackMessage.includes("succès") ? "alert-success" : "alert-error"
          }`}
        >
          {feedbackMessage}
        </div>
      )}

      {activeTab === "upload" && (
        <form className="upload-form" onSubmit={handleSubmit}  encType="multipart/form-data" >
          {editingMontre && (
            <div className="editing-notice">
              <p>
                ✏️ Vous êtes en train de modifier la montre:{" "}
                <strong>{editingMontre.reference || editingMontre.name}</strong>
              </p>
              <button
                type="button"
                onClick={cancelEditing}
                className="btn-cancel"
              >
                Annuler l'édition
              </button>
            </div>
          )}

          {/* Référence */}
          <div className="form-group">
            <label htmlFor="reference">Référence de la montre :</label>
            <input
              type="text"
              id="reference"
              name="reference"
              value={formData.reference}
              onChange={handleChange}
              required
            />
          </div>

          {/* Marque */}
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

          {/* Type */}
          <div className="form-group">
            <label htmlFor="type">Type :</label>
            <input
              type="text"
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              placeholder="Ex : Chronographe, Classique, Digital..."
            />
          </div>

          {/* Type de mouvement */}
          <div className="form-group">
            <label htmlFor="type_de_mouvement">Type de mouvement :</label>
            <input
              type="text"
              id="type_de_mouvement"
              name="type_de_mouvement"
              value={formData.type_de_mouvement}
              onChange={handleChange}
              placeholder="Ex : Automatique, Quartz..."
            />
          </div>

          {/* Origine du mouvement */}
          <div className="form-group">
            <label htmlFor="origine_mouvement">Origine du mouvement :</label>
            <input
              type="text"
              id="origine_mouvement"
              name="origine_mouvement"
              value={formData.origine_mouvement}
              onChange={handleChange}
              placeholder="Ex : Suisse, Japonais..."
            />
          </div>

          {/* Résistance à l'eau */}
          <div className="form-group">
            <label htmlFor="resistance_eau">Résistance à l'eau :</label>
            <input
              type="text"
              id="resistance_eau"
              name="resistance_eau"
              value={formData.resistance_eau}
              onChange={handleChange}
              placeholder="Ex : 3 ATM, 5 ATM, 100m..."
            />
          </div>

          {/* Bracelet */}
          <div className="form-group">
            <label htmlFor="bracelet">Bracelet :</label>
            <input
              type="text"
              id="bracelet"
              name="bracelet"
              value={formData.bracelet}
              onChange={handleChange}
              placeholder="Ex : Bracelet acier, cuir..."
            />
          </div>

          {/* Prix */}
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

          {/* URL de référence */}
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

          {/* Description */}
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

    {/* Images existantes (uniquement en mode édition) */}
    {editingMontre && existingImages.length > 0 && (
      <div className="form-group">
        <label htmlFor="images">Images existantes :</label>
   
<DragDropContext onDragEnd={handleDragEnd}>
  <Droppable droppableId="images">
    {(provided) => (
      <div
        className="image-grid"
        ref={provided.innerRef}
        {...provided.droppableProps} // ✅ ceci est nécessaire !
      >
        {existingImages.map((img, index) => (
<Draggable
  key={img.id}
  draggableId={String(img.id)}
  index={index}
>
  {(dragProvided, snapshot) => (
    <motion.div
      ref={dragProvided.innerRef}
      {...dragProvided.draggableProps}
      {...dragProvided.dragHandleProps}
      className="image-preview-container"
      layout
      animate={{
        scale: snapshot.isDragging ? 1.05 : 1,
        boxShadow: snapshot.isDragging
          ? "0 8px 20px rgba(0,0,0,0.25)"
          : "none",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      style={{
        userSelect: "none",
        cursor: "grab",
        position: "relative", // ✅ important pour le positionnement du numéro
        ...dragProvided.draggableProps.style,
      }}
    >
      {/* 🏷️ Numéro d'ordre */}
      <span className="image-order-number">{index + 1}</span>

      <img
        src={`${import.meta.env.VITE_API_URL}/api/uploads/${img.filename}`}
        alt={`Vue ${index + 1}`}
        className="preview-image"
        style={{ pointerEvents: "none" }}
      />
      <button
        type="button"
        className="btn-delete"
        onClick={() => handleDeleteImage(img.id, index)}
      >
        ❌
      </button>
    </motion.div>
  )}
</Draggable>
        ))}
        {provided.placeholder}
      </div>
    )}
  </Droppable>
</DragDropContext>

      </div>
    )}

          {/* Ajout de nouvelles images */}
    <div className="form-group">
      <label htmlFor="images">
        {editingMontre
          ? "Ajouter de nouvelles images :"
          : "Sélectionnez des images :"}
      </label>
      <input
        type="file"
        id="images"
        name="images"        
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            images: Array.from(e.target.files),
          }))
        }
        multiple
        accept="image/*"
      />
    </div>

          {/* Prévisualisation des nouvelles images */}
          {formData.images.length > 0 && (
            <div className="form-group">
              <label htmlFor="images">Nouvelles images :</label>
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
            </div>
          )}

          <button type="submit" className="btn-primary">
            {editingMontre ? "Modifier la montre" : "Uploader la montre"}
          </button>

          {editingMontre && (
            <button
              type="button"
              onClick={cancelEditing}
              className="btn-cancel"
            >
              Annuler
            </button>
          )}
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
                                  `${
                                    import.meta.env.VITE_API_URL
                                  }/api/uploads/${img.filename}`
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
                                src={`${
                                  import.meta.env.VITE_API_URL
                                }/api/uploads/${img.filename}`}
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
                    <p>Référence : {montre.reference}</p>
                    <p>Prix : {montre.price} €</p>
                    <p>Type : {montre.type}</p>
                    <p>Mouvement : {montre.mouvement}</p>
                    <p>Type mouvement : {montre.type_de_mouvement}</p>
                    <p>Origine mouvement : {montre.origine_mouvement}</p>
                    <p>Boîtier : {montre.materiau_boitier}</p>
                    <p>Cadran : {montre.couleur_cadran}</p>
                    <p>Bracelet : {montre.bracelet}</p>
                    <p>Résistance à l'eau : {montre.resistance_eau}</p>
                    <p>{montre.description}</p>
                  </div>
                  <div className="montre-actions">
                    <button
                      type="button"
                      className="btn-edit"
                      onClick={() => startEditing(montre)}
                    >
                      Modifier
                    </button>
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
