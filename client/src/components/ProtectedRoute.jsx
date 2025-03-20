import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { toast } from "react-toastify";

function ProtectedRoute({ children, allowedRoles }) {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  if (isLoading) return <p className="text-white">Loading...</p>;
  if (!user) {
    // toast("Please Login");
    return navigate("/account");
  }
  if (!allowedRoles.includes(user.role)) {
    toast("Not Authorized");

    return navigate("/");
  }
  return children;
}

export default ProtectedRoute;
