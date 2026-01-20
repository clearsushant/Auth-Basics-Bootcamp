import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../../pages/Login";
import Products from "../../pages/Products";
import Cart from "../../pages/Cart";
import Profile from "../../pages/Profile";
import Admin from "../../pages/Admin";
import ProtectedRoute from "../ProtectedRoute";
import RoleRoute from "../RoleRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/products" element={<Products />} />
      <Route path="/cart" element={
        <ProtectedRoute>
          <Cart />
        </ProtectedRoute>
      } />
      <Route path="/profile" element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      } />
      <Route path="/admin" element={
        <RoleRoute allowedRoles={['ADMIN']}>
          <Admin />
        </RoleRoute>
      } />
      <Route path="/" element={<Navigate to="/products" replace />} />
    </Routes>
  );
};

export default AppRoutes;
