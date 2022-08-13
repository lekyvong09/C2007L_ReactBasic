import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({children}) {
    const location = useLocation();

    if (localStorage.getItem('isLoggedInStatue') !== '1') {
        return <Navigate to="/login" replace state={{from: location}} />;
    }
    return children;
}

export default ProtectedRoute;