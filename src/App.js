import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
// Components
import MyNavbar from "./components/Nav";
import Categories from "./components/Categories";

//Pages
import GeneralPage from "./pages/General";
import SportPage from "./pages/Sport";
import FunFactPage from "./pages/Funfact";
import ConstitutionalPage from "./pages/Constitutional";
import HistorialPage from "./pages/Historical";
import NaturePage from "./pages/Nature";

function App() {
  return (
    <>
      <MyNavbar />
      <Routes>
        {/* Render Categories on Home */}
        <Route path="/" element={<Categories />} /> {/* Pages route */}
        <Route path="/historical" element={<HistorialPage />} />
        <Route path="/nature" element={<NaturePage />} />
        <Route path="/constitutional" element={<ConstitutionalPage />} />
        <Route path="/funFact" element={<FunFactPage />} />
        <Route path="/general" element={<GeneralPage />} />
        <Route path="/sport" element={<SportPage />} />
      </Routes>
    </>
  );
}

export default App;