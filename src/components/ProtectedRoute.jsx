import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children, requiredRole }) {
  const { user } = useAuth();
  if (!user){
    return <Navigate to="/login" replace/>;
  }
  if(requiredRole && user.role !== requiredRole){
    return <p>You do not have access to this page.</p>;
  }
  return children;
}

export default ProtectedRoute;