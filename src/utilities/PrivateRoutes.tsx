import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "src/contexts/UserContext";

function PrivateRoutes(){
    const token = localStorage.getItem('token');
    const login = useContext(UserContext);
    return ( token && login ? <Outlet /> : <Navigate to='/login' />)
}

export default PrivateRoutes