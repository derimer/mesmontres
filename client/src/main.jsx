import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import App from "./App";
import Accueil from "./pages/Accueil";
import Montres from "./pages/Montres";
import MontreDetail from "./pages/MontresDetail";
import ValidationCommande from "./pages/ValidationCommande";
import APropos from "./pages/APropos";
import NotFound from "./pages/NotFound";
import Login from "./components/Login";
import Admin from "./components/Admin";
import Categories from "./components/Categories";
import Subcategories from "./components/Subcategories";
import Contact from "./components/Contact";
import PrivateRoute from "./components/PrivateRoute";

// ✅ La page d'accueil est la route principale
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // Accueil affichée par défaut
      { index: true, element: <Accueil /> },

      // Toutes les autres pages en enfants
      { path: "montres", element: <Montres /> },
      { path: "montres/:id", element: <MontreDetail /> },
      { path: "validation-commande/:id", element: <ValidationCommande /> },
      { path: "a-propos", element: <APropos /> },
      {
        path: "admin",
        element: (
          <PrivateRoute>
            <Admin />
          </PrivateRoute>
        ),
      },
      { path: "login", element: <Login /> },
      { path: "categories", element: <Categories /> },
      { path: "subcategories/:subId", element: <Subcategories /> },
      { path: "contact", element: <Contact /> },

      // Redirige toute URL inconnue vers l'accueil
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
  // Si jamais / seul échoue, affiche une 404
  {
    path: "*",
    element: <NotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
