import { Routes, Route, Navigate } from "react-router-dom";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import SignupScreen from "./screens/SignupScreen";

function AppRoutes() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Routes>
      <Route 
        path="/" 
        element={user ? <HomeScreen /> : <LoginScreen />} />

      <Route
        path="/signup"
        element={user ? <Navigate to="/" /> : <SignupScreen />} />

      {/* <Route path="*" element={<Navigate to="/" />} /> */}
    </Routes>
  );
}

export default AppRoutes;
