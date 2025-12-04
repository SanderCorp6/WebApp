import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import ProtectedRoute from "../components/layout/ProtectedRoute";

import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import MainLayout from "../layouts/MainLayout";
import EmployeesPage from "../pages/EmployeesPage";
import VacationsPage from "../pages/VacationsPage";
import OpeningsPage from "../pages/OpeningsPage";
import EmployeeDetailPage from "../pages/EmployeeDetailPage";
import EmployeeRegisterPage from "../pages/EmployeeRegisterPage";

function AppRouter() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/signup" element={user ? <Navigate to="/" /> : <SignupPage />} />
      <Route path="/login" element={user ? <Navigate to="/" /> : <LoginPage />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<EmployeesPage />} />
        <Route path="employees/:id" element={<EmployeeDetailPage />} />
        <Route path="employees/register" element={<EmployeeRegisterPage />} />
        <Route path="vacations" element={<VacationsPage />} />
        <Route path="openings" element={<OpeningsPage />} />
      </Route>

      <Route path="*" element={<Navigate to={user ? "/" : "/login"} />} />
    </Routes>
  );
}

export default AppRouter;
