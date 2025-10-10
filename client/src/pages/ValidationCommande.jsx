import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import "./ValidationCommande.css";

function ValidationCommande() {
  const { id } = useParams(); // /validation-commande/:id
  const [referenceURL, setReferenceURL] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetch(`${import.meta.env.VITE_API_URL}/montres/${id}`)
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

  if (loading) return <div>Chargement...</div>;

  return (
    <div className="validation-container">
      <h1>Validation de commande</h1>
      <p>
        <strong>Important :</strong> N’étant pas un professionnel et ne
        disposant par conséquent pas d’un SIRET, je ne peux mettre en place un
        système de paiement sur ce site.
      </p>
      <p>
        Par défaut, l’achat final se fera sur le site du{" "}
        <strong>
          {referenceURL ? (
            <Link to={referenceURL} className="link">
              Bon coin
            </Link>
          ) : (
            "Bon coin (lien non disponible pour le moment)"
          )}
        </strong>
        , sur lequel figurent également mes annonces. Cela permet d’une part un
        paiement sécurisé (vous maîtrisez la validation finale du paiement après
        réception de la montre), et d’autre part, vous bénéficiez des frais de
        ports réduits.
      </p>
      <p>
        Si vous ne souhaitez pas utiliser Le bon coin ou n’avez pas de compte,
        il est possible de procéder en direct avec ma page de contact :
      </p>
      <ul>
        <li>PayPal – paiement entre amis</li>
        <li>Virement bancaire instantané</li>
        <li>Wero (anciennement Paylib)</li>
      </ul>
      <p>
        Pour ce faire, merci de bien vouloir utiliser le
        <Link to="/contact" className="link">
          formulaire de contact
        </Link>
        afin d’obtenir les informations nécessaires.
      </p>
      <p>
        <strong>Important :</strong> les frais d’expédition s’appliqueront au
        réel (Mondial Relay ou Colissimo).
      </p>
    </div>
  );
}

export default ValidationCommande;
