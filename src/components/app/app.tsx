import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Navbar } from "../large/navbar/navbar";
import Footer from "../large/footer/footer";
import LandingPage from "../../pages/landing-page";
import ViewAllClothes from "../../pages/view-all-clothes";
import AdminSignIn from "../../pages/admin/signin";
import AdminSignOut from "../../pages/admin/signout";
import AdminViewAllClothes from "../../pages/admin/view-all-clothes.admin";
import AdminCreateCloth from "../../pages/admin/create-cloth";
import "./App.css";

function App() {
  return (
    <div id="app">
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/view-all-clothes" element={<ViewAllClothes />} />
          <Route path="/admins/signin" element={<AdminSignIn />} />
          <Route path="/admins/signout" element={<AdminSignOut />} />
          <Route
            path="/admins/view-all-clothes"
            element={<AdminViewAllClothes />}
          />
          <Route path="/admins/clothes/create" element={<AdminCreateCloth />} />
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
