import type React from "react"
import { Navigate, useLocation } from "react-router-dom"
import { Box, CircularProgress } from "@mui/material"
import { useAppSelector } from "./store/Hooks"
import { selectUser } from "./store/UserSlice"


interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: string | string[]
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const { isAuthenticated, loading, user } = useAppSelector(selectUser)
  const location = useLocation()
//  const { user, loading, isAuthenticated } = useAppSelector((state) => ({
//     user: selectUser(state),
//     loading: state.user?.loading,
//     isAuthenticated: state.user?.isAuthenticated,
//   }))
  // Check if user has the required role
  const hasRequiredRole = () => {
    if (!requiredRole || !user) return true

    if (Array.isArray(requiredRole)) {
      return requiredRole.includes(user.role)
    }

    return user.role === requiredRole
  }

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: "linear-gradient(to bottom right, #f0fdfa, #ffffff, #ecfdf5)",
        }}
      >
        <CircularProgress
          size={60}
          thickness={4}
          sx={{
            color: "#10b981",
          }}
        />
      </Box>
    )
  }

  if (!isAuthenticated) {
    // Redirect to login page with the return url
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (!hasRequiredRole()) {
    // Redirect to unauthorized page
    return <Navigate to="/unauthorized" replace />
  }

  return <>{children}</>
}

export default ProtectedRoute
