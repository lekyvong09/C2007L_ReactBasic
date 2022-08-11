import { Navigate } from "react-router-dom";

function ProtectedRoute({children}) {
    if (localStorage.getItem('isLoggedInStatue') !== '1') {
        return <Navigate to="/login" replace />;
    }
    return children;
}

export default ProtectedRoute;