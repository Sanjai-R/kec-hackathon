import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userAtom } from '../state/atom';

const PrivateRoute = () => {
    const user = useRecoilValue(userAtom);
    return user.email === '' ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;