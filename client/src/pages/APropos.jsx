import "../App.css";
import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";

function APropos() {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="a-propos-modern-container">
      {/* Hero Section */}
      <div className="a-propos-hero">
        <div className="hero-overlay" />
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="hero-title"
        >
          Restaurer, Préserver,
          <br /> Redonner Vie
        </motion.h1>
      </div>

      {/* Contenu principal */}
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={containerVariants}
        className="a-propos-content"
      >
        {/* Histoire personnelle */}

        {/* Philosophie de travail */}
        <motion.section
          variants={itemVariants}
          className="a-propos-modern-section"
        >
          <div className="section-header">
            <h2>Ma Démarche</h2>
            <div className="divider" />
          </div>

          <p>
            Tout d’abord, je ne suis pas horloger, mais un amateur passionné.
            J’aime restaurer les objets et leur redonner leur état d’origine.
            Après avoir commencé avec des consoles de jeux portables puis des
            smartphones, c’est en 2022 que je me suis tourné vers les montres.
            Pourquoi les montres ? Parce qu’elles sont à la fois des objets du
            quotidien utiles et de véritables bijoux à mes yeux. Je ne travaille
            pas sur les mouvements mécaniques, qui nécessitent des outils et des
            compétences d’horloger professionnel. Mon univers reste celui de la
            montre à quartz, à laquelle je redonne une seconde vie à travers des
            restaurations minutieuses.
          </p>
          <ul className="modern-list">
            <li>
              <span className="list-icon">✔</span>Démontage complet et
              nettoyage aux ultrasons
            </li>
            <li>
              <span className="list-icon">✔</span>Remplacement systématique du
              verre
            </li>
            <li>
              <span className="list-icon">✔</span>Changement du bracelet si
              nécessaire
            </li>
            <li>
              <span className="list-icon">✔</span>Alignement précis des
              aiguilles de chronomètre
            </li>
            <li>
              <span className="list-icon">✔</span>Graissage du joint de boîtier
            </li>
            <li>
              <span className="list-icon">✔</span>Test de résistance à l'eau
              (pour les montres 10 ATM)
            </li>
            <li>
              <span className="list-icon">✔</span>Remplacement du mouvement si
              besoin
            </li>
          </ul>
          <p>
            Seuls les boîtiers, cadrans et aiguilles (sauf exception) restent
            dans leur état d’origine. Une fois restaurées, les montres sont
            vendues en parfait état, équipées d’une pile neuve.
          </p>
        </motion.section>

        {/* Marques favorites */}
        <motion.section
          variants={itemVariants}
          className="a-propos-modern-section"
        >
          <div className="section-header">
            <h2>Mes Marques de Prédilection</h2>
            <div className="divider" />
          </div>
          <p>
            Je sélectionne uniquement des modèles qui me plaisent, dans une
            gamme accessible. Voici quelques-unes de mes références favorites :
          </p>
          <div className="philosophy-grid">
            <div className="philosophy-item item1">
              <h3>Pulsar (Seiko)</h3>
            </div>
            <div className="philosophy-item item2">
              <h3>Seiko</h3>
            </div>
            <div className="philosophy-item item3">
              <h3>LIP</h3>
            </div>
            <div className="philosophy-item item4">
              <h3>Casio / Edifice</h3>
            </div>
            <div className="philosophy-item item5">
              <h3>Maserati</h3>
            </div>
            <div className="philosophy-item item6">
              <h3>Tissot</h3>
            </div>
            <div className="philosophy-item item7">
              <h3>Fossil</h3>
            </div>
            <div className="philosophy-item item8">
              <h3>Festina</h3>
            </div>
            <div className="philosophy-item item9">
              <h3>Lotus</h3>
            </div>
          </div>
          <p style={{ textAlign: "center", marginTop: "1rem" }}>
            Parfois, il m’arrive aussi d’acheter quelques pièces neuves
            d’origine chinoise au style recherché et à prix très accessibles,
            mais cela reste rare.
          </p>
        </motion.section>

        {/* Conclusion */}
        <motion.section
          variants={itemVariants}
          className="a-propos-modern-section guarantee-section"
        >
          <div className="section-header">
            <h2>Mes Engagements</h2>
            <div className="divider" />
          </div>
          <ul className="modern-list">
            <li>
              <span className="list-icon">✔</span>
              <span>Authentification par 3 experts minimum</span>
            </li>
            <li>
              <span className="list-icon">✔</span>
              <span>État décrit avec une précision d'horloger</span>
            </li>
            <li>
              <span className="list-icon">✔</span>
              <span>Service client dédié 7j/7</span>
            </li>
            <li>
              <span className="list-icon">✔</span>
              <span>Satisfait ou échangé</span>
            </li>
          </ul>
          <Link to="/montres" className="cta-button">
            Découvrir ma collection
          </Link>
        </motion.section>
      </motion.div>
    </div>
  );
}

export default APropos;
