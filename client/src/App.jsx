import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />
      <Outlet /> {/* Ici s'affiche le contenu de chaque page */}
      <Footer />
    </>
  );
}

export default App;
