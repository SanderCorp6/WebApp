import { Routes, Route, Navigate } from "react-router-dom";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import MainLayout from "./layouts/MainLayout";
import EmployeesScreen from "./screens/EmployeesScreen";
import VacationsScreen from "./screens/VacationsScreen";
import PositionsScreen from "./screens/PositionsScreen";

function AppRoutes() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Routes>
      <Route path="/signup" element={user ? <Navigate to="/" /> : <SignupScreen />} />
      <Route path="/login" element={user ? <Navigate to="/" /> : <LoginScreen />} />
      <Route path="/" element={user ? <MainLayout /> : <Navigate to="/login" />}>
        <Route index element={<EmployeesScreen />} /> 
        <Route path="vacations" element={<VacationsScreen />} /> 
        <Route path="positions" element={<PositionsScreen />} /> 
      </Route>


      {/* <Route path="*" element={<Navigate to="/" />} /> */}
    </Routes>
  );
}

export default AppRoutes;
