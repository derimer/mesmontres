import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [adminExists, setAdminExists] = useState(null);

  // Vérifier si un admin existe déjà
  useEffect(() => {
    const checkAdmin = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/exists`);
      const data = await res.json();
      setAdminExists(data.exists);
    };
    checkAdmin();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const route = adminExists ? "login" : "register";

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/${route}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Erreur");

      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("isAdminLoggedIn", "true");

      navigate("/admin");
    } catch (err) {
      setError(err.message);
    }
  };

  if (adminExists === null) return <p>Chargement...</p>;

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>
          {adminExists
            ? "Connexion administrateur"
            : "Créer le mot de passe administrateur"}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="admin-password">Mot de passe</label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-input"
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="btn-primary">
            {adminExists ? "Se connecter" : "Créer le mot de passe"}
          </button>
        </form>
      </div>
    </div>
  );
}
