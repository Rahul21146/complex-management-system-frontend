import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/home";
import ForgetPassword from "./pages/forgetPassword";
import ResetPassword from "./pages/resetPassword";

import OwnerPage from "./pages/ownerPage";
import TenantPage from "./pages/tenetsPage";

function App() {
  const token = localStorage.getItem("KD_COMPLEX_TOKEN");
  const role = localStorage.getItem("KD_COMPLEX_ROLE");

  return (
    <Routes>
      {/* ================= PUBLIC ROUTES ================= */}

      <Route path="/" element={<Home />} />

      <Route
        path="/forget-password"
        element={<ForgetPassword />}
      />

      <Route
        path="/reset-password"
        element={<ResetPassword />}
      />

      {/* ================= COMMON DASHBOARD ================= */}

      <Route
        path="/dashboard"
        element={
          !token ? (
            <Navigate to="/" replace />
          ) : role === "owner" ? (
            <Navigate to="/owner/dashboard" element={<OwnerPage />} />
          ) : role === "tenant" ? (
            <Navigate to="/tenant/dashboard" element={<TenantPage />} />  
          ) : (
            <Navigate to="/" replace />
          )
        }
      />

      {/* ================= OWNER ROUTES ================= */}

      <Route
        path="/owner/dashboard"
        element={
          !token ? (
            <Navigate to="/" replace />
          ) : role !== "owner" ? (
            <Navigate to="/tenant/dashboard" replace />
          ) : (
            <OwnerPage />
          )
        }
      />

      {/* ================= TENANT ROUTES ================= */}

      <Route
        path="/tenant/dashboard"
        element={
          !token ? (
            <Navigate to="/" replace />
          ) : role !== "tenant" ? (
            <Navigate to="/owner/dashboard" replace />
          ) : (
            <TenantPage />
          )
        }
      />

      {/* ================= INVALID ROUTE ================= */}

      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />
    </Routes>
  );
}

export default App;