import React from 'react';
import {Navigate, Outlet} from 'react-router';
import {useAuth} from '../context/AuthContext';

// useAuth() pour vérifier si user existe ; sinon redirige vers /login

const PrivateRoute = () => {
    const {user} = useAuth();
    return user ? <Outlet/> : <Navigate to="/login" replace/>;
};

export default PrivateRoute;
