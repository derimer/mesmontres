import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "4rem 2rem",
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1 style={{ fontSize: "3rem", color: "#f4c542", marginBottom: "1rem" }}>
        404
      </h1>
      <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem", color: "#333" }}>
        Page non trouvée
      </h2>
      <p style={{ marginBottom: "2rem", color: "#666" }}>
        Désolé, la page que vous recherchez n'existe pas.
      </p>
      <Link
        to="/"
        style={{
          background: "#f4c542",
          color: "#000",
          padding: "1rem 2rem",
          borderRadius: "50px",
          textDecoration: "none",
          fontWeight: "600",
          transition: "all 0.3s ease",
        }}
      >
        Retour à l'accueil
      </Link>
    </div>
  );
}

export default NotFound;
