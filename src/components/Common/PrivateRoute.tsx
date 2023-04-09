import * as React from 'react';
import { Navigate, Route, RouteProps, Routes } from 'react-router-dom';

interface PrivateRouteProps {}
export function PrivateRoute(props: RouteProps) {
    const isLoggedIn = Boolean(localStorage.getItem('access_token'));
    if (!isLoggedIn) {
        return <Navigate to="/login" replace={true} />;
    }

    return (
        <Routes>
            <Route {...props} />
        </Routes>
    );
}
