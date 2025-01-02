import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import Onboarding from "./pages/Onboarding/Onboarding";
import SignUp from "./pages/Auth/SignUp";
import Login from "./pages/Auth/Login";

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/get-started" element={<Onboarding />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
}
