import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import ProtectedRoute from '../components/ProtectedRoute';

// Importa las páginas
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import MainLayout from '../layouts/MainLayout';
import EmployeesPage from '../pages/EmployeesPage';
import VacationsPage from '../pages/VacationsPage';
import PositionsPage from '../pages/PositionsPage';
import EmployeeDetailPage from '../pages/EmployeeDetailPage';

function AppRouter() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route
        path="/signup"
        element={user ? <Navigate to="/" /> : <SignupPage />} />
      <Route
        path="/login"
        element={user ? <Navigate to="/" /> : <LoginPage />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        } >
        <Route index element={<EmployeesPage />} />
        <Route path="employees/:id" element={<EmployeeDetailPage />} />
        <Route path="vacations" element={<VacationsPage />} />
        <Route path="positions" element={<PositionsPage />} />
      </Route>

      <Route path="*" element={<Navigate to={user ? '/' : '/login'} />} />
    </Routes>
  );
}

export default AppRouter;