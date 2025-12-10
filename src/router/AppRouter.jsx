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
import ActivateAccountPage from "../pages/ActivateAccountPage";
import toast from "react-hot-toast";

const RoleRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();
  if (!user || !allowedRoles.includes(user.role)) {
    toast.error("You are not authorized to access this page.");
    return <Navigate to="/" replace />;
  }
  return children;
};

function AppRouter() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/signup" element={user ? <Navigate to="/" /> : <SignupPage />} />
      <Route path="/login" element={user ? <Navigate to="/" /> : <LoginPage />} />
      <Route path="/activate" element={<ActivateAccountPage />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<EmployeesPage />} />
        <Route
          path="employees/:id"
          element={
            <RoleRoute allowedRoles={["Administrator", "HR"]}>
              <EmployeeDetailPage />
            </RoleRoute>
          }
        />
        <Route
          path="employees/register"
          element={
            <RoleRoute allowedRoles={["Administrator"]}>
              <EmployeeRegisterPage />
            </RoleRoute>
          }
        />
        <Route path="vacations" element={<VacationsPage />} />
        <Route
          path="openings"
          element={
            <RoleRoute allowedRoles={["Administrator", "HR"]}>
              <OpeningsPage />
            </RoleRoute>
          }
        />
      </Route>

      <Route path="*" element={<Navigate to={user ? "/" : "/login"} />} />
    </Routes>
  );
}

export default AppRouter;
