// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Onboarding from "./pages/Onboarding/Onboarding";
// import SignUp from "./pages/Auth/SignUp";
// import Login from "./pages/Auth/Login";
// import Dashboard from "./pages/Dashboard/Dashboard";
// import VerifyEmail from "./pages/Auth/VerifyEmail";
// import { Toaster } from "react-hot-toast";

// export default function App() {
//   return (
//     <>
//       <Router>
//         <Routes>
//           <Route path="/" element={<Onboarding />} />
//           {/* <Route path="/get-started" element={<Onboarding />} /> */}
//           <Route path="/register" element={<SignUp />} />
//           <Route path="/verify" element={<VerifyEmail />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/discover" element={<Dashboard />} />
//           <Route path="/my-books" element={<Dashboard />} />
//           <Route path="/bookclub" element={<Dashboard />} />
//           <Route path="/contact-us" element={<Dashboard />} />
//         </Routes>
//       </Router>
//       <Toaster />
//     </>
//   );
// }

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Onboarding from "./pages/Onboarding/Onboarding";
import SignUp from "./pages/Auth/SignUp";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import VerifyEmail from "./pages/Auth/VerifyEmail";
import { Toaster } from "react-hot-toast";
import Reviews from "./pages/Reviews/Review";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import ResetPassword from "./pages/Auth/ResetPassword";
import OtpSent from "./pages/Auth/OtpSent";

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Onboarding />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/verify" element={<VerifyEmail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/forgot-password-confirm" element={<OtpSent />} />
          <Route path="/reset-password/:id" element={<ResetPassword />} />
          <Route path="/discover" element={<Dashboard />} />
          {/* <Route path="/my-books" element={<Dashboard />} /> */}
          {/* <Route path="/bookclub" element={<Dashboard />} /> */}
          {/* <Route path="/contact-us" element={<Dashboard />} /> */}
          <Route path="/reviews/:id" element={<Reviews />} />
        </Routes>
      </Router>
      <Toaster />
    </>
  );
}
