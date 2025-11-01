// Importation du fichier CSS pour le style de la page d'accueil

import { Link } from "react-router-dom";
import "../App.css";

function Accueil() {
  return (
    <section
      className="accueil"
      aria-label="Page d'accueil de notre collection de montres"
    >
      <div>
        <p className=" description">
          Montres d'occasion
          <span className="highlight"> restaurées ou rénovées</span> et{" "}
          <span className="highlight">en parfait état</span>.
        </p>
        <div className="accueil-content">
          <img
            className="image-temps "
            src="/images/tempsquipasse.jpg"
            alt="Montre d'occasion"
          />
          <section className="description-section">
            <img
              className="logo-montre"
              src="/images/logo7.jpg"
              alt="Logo Mes Montres"
            />
            <h2>Mes Montres</h2>

            <img
              className="image-montre"
              src="/images/montre.jpg"
              alt="Montres d'occasion"
            />
            <p>
              Découvrez mes collections de montres d'occasion soigneusement
              sélectionnées.
            </p>
            <Link className="btn" to="/montres">
              Voir les montres
            </Link>
          </section>
        </div>
      </div>
    </section>
  );
}

export default Accueil;
