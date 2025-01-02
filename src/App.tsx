import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import Onboarding from "./pages/Onboarding/Onboarding";

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/get-started" element={<Onboarding />} />
        </Routes>
      </Router>
    </>
  );
}
