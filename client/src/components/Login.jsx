import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();

  // Mot de passe "en dur"
  const ADMIN_PASSWORD = "jrdCAT07@";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    if (password === ADMIN_PASSWORD) {
      // indique que l'admin est "connecté"
      localStorage.setItem("isAdminLoggedIn", "true");
      // (optionnel) tu peux stocker aussi l'email si besoin
      localStorage.setItem("adminEmail", email || "admin");
      navigate("/admin");
    } else {
      setError("Mot de passe incorrect.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Connexion administrateur</h2>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email (facultatif)</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="btn-primary">
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
}
