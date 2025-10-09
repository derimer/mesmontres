import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import Accueil from "./pages/Accueil";
import Montres from "./pages/Montres";
import APropos from "./pages/APropos";
import NotFound from "./pages/NotFound";
import Login from "./components/Login";
import Admin from "./components/Admin";
import Categories from "./components/Categories";
import Subcategories from "./components/Subcategories";
import MontreDetail from "./pages/MontresDetail";
import ValidationCommande from "./pages/ValidationCommande";
import Contact from "./components/Contact";
import PrivateRoute from "./components/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Accueil /> },
      { path: "montres", element: <Montres /> },
      { path: "montres/:id", element: <MontreDetail /> },
      { path: "validation-commande/:id", element: <ValidationCommande /> }, // ← CORRECTION ICI
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
      { path: "*", element: <NotFound /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
