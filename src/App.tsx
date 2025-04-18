import {Routes, Route, useLocation} from "react-router-dom";
import Home from "./pages/home/home";
import About from "./pages/about/about";
import Contact from "./pages/contact/contact";
import Programs from "./pages/programs/programs";
import Research from "./pages/research/research";
import Navbar from "./components/nav/nav";
import Footer from "./components/foot/footer";
import Login from "./components/authetication/login";
import Profile from "./pages/user-profile/user-profile";
import AdminDashboard from "./pages/admin-dashboard/admin-dashboard";
import ProtectedRoute from './context/protect-routes';
import Register from "./components/authetication/register";


export default function App() {
  const location = useLocation();
  const hideFooterPaths = ["/login", "/register", "/admin-dashboard", '/profile'];
  const shouldShowFooter = !hideFooterPaths.includes(location.pathname);

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <div style={{ flex: "1" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/research" element={<Research />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
            <Route path="/profile" element={<Profile />} />
          </Route>

        </Routes>
      </div>
      {shouldShowFooter && <Footer />}
    </div>
  );
}
