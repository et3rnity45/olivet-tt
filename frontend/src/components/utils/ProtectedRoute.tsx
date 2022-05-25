import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = (): JSX.Element => {
	if (!localStorage.token) {
		return <Navigate to={{ pathname: '/login' }} replace />;
	}
	return <Outlet />;
};

export default ProtectedRoute;
