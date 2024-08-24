import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = useSelector(state => state.account.isAuthenticated);

    if (isAuthenticated === false) {
        return <Navigate to="/login" replace />
    }
    return children;
}

export default ProtectedRoute;