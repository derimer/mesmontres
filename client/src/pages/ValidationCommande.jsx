import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./ValidationCommande.css";

function ValidationCommande() {
  const { id } = useParams();
  const [referenceURL, setReferenceURL] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetch(`/api/montres/${id}`)
  .then((res) => res.json())
  .then((data) => {
    setReferenceURL(data.referenceURL || "");
    setLoading(false);
  })
  .catch(() => {
    setReferenceURL("");
    setLoading(false);
  });


    }
  }, [id]);

  if (loading) return <div className="loading-spinner">Chargement...</div>;

  return (
    <div className="validation-container">
      <div className="content-wrapper">
        {/* En-tête */}
        <header className="validation-header">
          <h1>Validation de commande</h1>
          <p className="header-subtitle">
            Finalisez votre achat en toute simplicité
          </p>
        </header>

        {/* Message important */}
        <div className="important-notice">
          <h2>Important :</h2>
          <p>
            N'étant pas vendeur professionnel disposant d'un Siret, je ne peux
            pas mettre en place un système de paiement en ligne sur ce site.
          </p>
        </div>

        <div className="options-grid">
          {/* Option Le Bon Coin */}
          <section className="option-card featured">
            <div className="card-header">
              <h2>Le Bon Coin</h2>
              <span className="badge">Recommandé</span>
            </div>
            <div className="card-content">
              <ul className="benefits-list">
                <li>Frais de port réduits</li>
                <li>Choix du point relais ou Colissimo</li>
                <li>Protection acheteur et garantie</li>
                <li>Paiement sécurisé après réception</li>
              </ul>
              {referenceURL ? (
                <Link to={referenceURL} className="btn primary">
                  Voir sur Le Bon Coin →
                </Link>
              ) : (
                <p className="no-link">Lien temporairement indisponible</p>
              )}
            </div>
          </section>

          {/* Option Vinted */}
          <section className="option-card">
            <h2>Vinted</h2>
            <div className="card-content">
              <p>
                Mêmes avantages que Le Bon Coin. Recherchez la montre avec sa{" "}
                <strong>référence à 9 chiffres de sa description</strong>.
              </p>
              <Link
                to="https://www.vinted.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="btn secondary"
              >
                Accéder à Vinted →
              </Link>
            </div>
          </section>

          {/* Options de paiement alternatives */}
          <section className="option-card full-width">
            <h2>Solutions de paiement direct</h2>
            <div className="payment-methods">
              <div className="method-item">
                <h3>Virement instantané</h3>
                <p>Transfert immédiat et sécurisé</p>
              </div>
              <div className="method-item">
                <h3>Wero (Paylib)</h3>
                <p>Disponible via la plupart des applications bancaires</p>
              </div>
              <div className="method-item">
                <h3>PayPal</h3>
                <p>Option "paiement entre amis"</p>
              </div>
            </div>
            <div className="contact-section">
              <p>
                Pour ces options, contactez-moi en précisant la{" "}
                <strong>référence de la montre</strong> et votre{" "}
                <strong>choix de paiement</strong>.
              </p>
              <div className="button-group">
                <Link to="/contact" className="btn outline">
                  Formulaire de contact
                </Link>
                <Link to={referenceURL || "#"} className="btn outline">
                  Le Bon Coin
                </Link>
                <Link
                  to="https://www.vinted.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn outline"
                >
                  Vinted
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default ValidationCommande;
