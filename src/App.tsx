import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import Onboarding from "./pages/Onboarding/Onboarding";
import SignUp from "./pages/Auth/SignUp";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import VerifyEmail from "./pages/Auth/VerifyEmail";
export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/get-started" element={<Onboarding />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/verify" element={<VerifyEmail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/discover" element={<Dashboard />} />
          <Route path="/my-books" element={<Dashboard />} />
          <Route path="/bookclub" element={<Dashboard />} />
          <Route path="/contact-us" element={<Dashboard />} />
        </Routes>
      </Router>
    </>
  );
}
