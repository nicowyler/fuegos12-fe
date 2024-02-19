import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";


const Authentificated: React.FC = ( ) => {
    const { auth } = useAuth();
    const location = useLocation();
    return (    
        auth
            ? <Navigate to={"/"} state={{ from: location }} replace />
            : <Outlet />
    );
}

export default Authentificated;