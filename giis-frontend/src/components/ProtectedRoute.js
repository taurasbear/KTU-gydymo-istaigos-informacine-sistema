import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const ProtectedRoute = ({ requiredUserType }) => {
    const { user } = useContext(AuthContext);

    if (!user || user.naudotojo_tipas !== requiredUserType) {
        return <Navigate to="/login" />;
    }

    return <Outlet />;
};

export default ProtectedRoute;