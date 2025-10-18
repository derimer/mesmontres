import { useState } from "react";
import "./Contact.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "information", // valeur par défaut compatible avec ENUM
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérification côté front
    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      setSubmitMessage("❌ Tous les champs sont obligatoires.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(
          errorData.message || "Erreur lors de l'envoi du message"
        );
      }

      const result = await res.json();
      setSubmitMessage(
        result.message || "✅ Votre message a été envoyé avec succès !"
      );
      setFormData({
        name: "",
        email: "",
        subject: "information",
        message: "",
      });
    } catch (error) {
      console.error("Erreur API:", error);
      setSubmitMessage(
        "❌ Erreur lors de l'envoi du message. Veuillez réessayer."
      );
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitMessage(""), 5000);
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-header">
        <h1>Contactez-moi</h1>
        <p className="contact-subtitle">
          Une question sur nos montres ? Je vous répondrai sous 24h
        </p>
      </div>

      <div className="contact-content">
        <div className="contact-form-section">
          <div className="contact-form-card">
            <h2>Envoyez-moi un message</h2>

            {submitMessage && (
              <div className="alert alert-success">{submitMessage}</div>
            )}

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Votre nom *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Votre email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject">référence *</label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="form-input"
                >
                  <option value="information">Demande d'information</option>
                  <option value="achat">Achat d'une montre</option>
                  <option value="support">Support technique</option>
                  <option value="partenariat">Partenariat</option>
                  <option value="autre">Autre</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message">Votre message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  className="form-textarea"
                  placeholder="Décrivez-nous votre demande en détail..."
                />
              </div>

              <button
                type="submit"
                className="btn-submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
