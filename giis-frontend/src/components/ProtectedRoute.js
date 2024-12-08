import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const ProtectedRoute = ({ requiredUserType }) => {
    const { user } = useContext(AuthContext);
    console.log(user);
    if (!user) {
        return <Navigate to="/login" />;
    }
    else if (user.naudotojo_tipas !== requiredUserType) {
        return <Navigate to="/" />;
    }

    return <Outlet />;
};

export default ProtectedRoute;