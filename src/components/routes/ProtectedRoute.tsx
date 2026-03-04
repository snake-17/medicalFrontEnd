import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const ProtectedRoute = () => {
  const { user } = useAuth();

  // Si no hay usuario, redirigimos a /login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Si hay usuario, renderizamos el contenido de la ruta (Outlet)
  return <Outlet />;
};

export default ProtectedRoute;
