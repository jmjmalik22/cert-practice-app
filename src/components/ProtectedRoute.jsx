import { Navigate, useOutletContext } from "react-router-dom";

export function ProtectedRoute({ children }) {
  const { user } = useOutletContext();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
}
