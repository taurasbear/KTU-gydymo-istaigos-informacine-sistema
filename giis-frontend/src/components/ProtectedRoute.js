import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const ProtectedRoute = ({ requiredUserType, element }) => {
    const { user } = useContext(AuthContext);
    console.log("ProtectedRoute >", user);
    console.log("ProtectedRoute > requiredUserType", requiredUserType);
    console.log("ProtectedRoute > user.naudotojo_tipas", user.naudotojo_tipas);
    if (!user) {
        return <Navigate to="/login" />;
    }
    else if (user.naudotojo_tipas !== requiredUserType) {
        return <Navigate to="/" />;
    }

    return element;
};

export default ProtectedRoute;