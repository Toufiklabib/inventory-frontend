import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Context/NotificationContext/AuthContext';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-white text-xl">Loading...</p>
                
            </div>
        );
    }

   
    if (user) {
        return children;
    }

 
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;