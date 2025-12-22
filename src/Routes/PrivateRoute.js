import { Navigate } from "react-router-dom"
import { authSelector } from "../redux/auth/authSelector";
import { useSelector } from "react-redux";

export const PrivateRoute = ({ children }) => {
    const isAuthenticated = useSelector(authSelector);
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
}