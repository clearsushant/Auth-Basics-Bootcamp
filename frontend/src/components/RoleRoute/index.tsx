import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getUser, isLoggedIn } from "../../utils";

type RoleRouteProps = {
  children: ReactNode;
  allowedRoles: string[];
};

const RoleRoute = ({ children, allowedRoles }: RoleRouteProps) => {
  const location = useLocation();
  const user = getUser();

  if (!isLoggedIn() || !user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    // Redirect to home/products if authorized but not enough permissions
    return <Navigate to="/products" replace />;
  }

  return <>{children}</>;
};

export default RoleRoute;
