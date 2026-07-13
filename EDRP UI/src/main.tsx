import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App, { 
  LandingScreen, 
  LoginScreen, 
  RegistrationScreen, 
  DashboardScreen, 
  EmployeeReviewerDashboardScreen, 
  ManagerDashboardScreen 
} from "./app/App.tsx";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/diagram" element={<App />} />
      <Route path="/" element={<LandingScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegistrationScreen />} />
      <Route path="/dashboard" element={<DashboardScreen />} />
      <Route path="/dashboard/employee" element={<EmployeeReviewerDashboardScreen />} />
      <Route path="/dashboard/manager" element={<ManagerDashboardScreen />} />
    </Routes>
  </BrowserRouter>
);