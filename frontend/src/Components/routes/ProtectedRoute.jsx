import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
function ProtectedRoute({children,allowedRoles}) {

    const token = useSelector(state => state.auth.token);
    const role = useSelector(state => state.auth.role);

    const isAllowed = allowedRoles.includes(role)
    const accessibleRoutes = token && isAllowed ? children :  <Navigate to='/login' replace={true}/>
  return accessibleRoutes;
}

export default ProtectedRoute