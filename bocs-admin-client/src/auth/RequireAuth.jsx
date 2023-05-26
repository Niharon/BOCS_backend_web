import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const RequireAuth = ({children}) => {

    const {auth} = useAuth();
    const location = useLocation()
    
    return (
        auth?.token 
        ? <Outlet/>
        : <Navigate to="/login" state={{from: location.pathname}} replace/>
    )

 
}

export default RequireAuth