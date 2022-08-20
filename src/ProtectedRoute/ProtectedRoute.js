import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import AuthContext from "../store/auth-context";

function ProtectedRoute({children}) {
    const location = useLocation();
    const authContext = useContext(AuthContext);
    console.log('is login? ', authContext.storeIsLoggedIn);
    if (!authContext.storeIsLoggedIn) {
        return <Navigate to="/login" replace state={{from: location}} />;
    }
    return children;
}

export default ProtectedRoute;