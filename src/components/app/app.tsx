import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Navbar } from "../large/navbar/navbar";
import Footer from "../large/footer/footer";
import LandingPage from "../../pages/landing-page";
import ViewAllClothes from "../../pages/view-all-clothes";
import "./App.css";

function App() {
  return (
    <div id="app">
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/view-all-clothes" element={<ViewAllClothes />} />
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
