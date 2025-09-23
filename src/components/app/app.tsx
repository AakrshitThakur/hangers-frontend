import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Navbar } from "../large/navbar/navbar";
import Footer from "../large/footer/footer";
import LandingPage from "../../pages/landing-page";
import ViewAllClothes from "../../pages/view-all-clothes";
import AdminSignIn from "../../pages/admin/signin";
import AdminSignOut from "../../pages/admin/signout";
import AdminViewAllClothes from "../../pages/admin/view-all-clothes.admin";
import AdminDeleteCloth from "../../pages/admin/delete-cloth";
import AdminCreateCloth from "../../pages/admin/create-cloth";
import AdminUpdateCloth from "../../pages/admin/update-cloth";
import IsAdminAuthenticated from "../../wrappers/is-admin-authenticated";
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
            path="/admins/clothes/view-all-clothes"
            element={
              <IsAdminAuthenticated>
                <AdminViewAllClothes />
              </IsAdminAuthenticated>
            }
          />
          <Route
            path="/admins/clothes/:deleteClothId/delete"
            element={
              <IsAdminAuthenticated>
                <AdminDeleteCloth />
              </IsAdminAuthenticated>
            }
          />
          <Route
            path="/admins/clothes/:clothId/update"
            element={
              <IsAdminAuthenticated>
                <AdminUpdateCloth />
              </IsAdminAuthenticated>
            }
          />
          <Route
            path="/admins/clothes/create"
            element={
              <IsAdminAuthenticated>
                <AdminCreateCloth />
              </IsAdminAuthenticated>
            }
          />
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
