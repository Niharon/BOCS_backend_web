import React, { useContext } from 'react'
import { UserContext } from '../App'
import { Navigate } from 'react-router-dom'

const RequireAuth = ({children}) => {
    
    const {userContext} = useContext(UserContext)

    if(userContext.user){
        return children
    }
    else{
        return <Navigate to="/login" />
    }
}

export default RequireAuth