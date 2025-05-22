import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"
import { RootStore } from "./components/store/Store"

export default function ProtectedRoute() {
  const isAuthenticated = useSelector((state:RootStore) => state.user.isAuthenticated)

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  return <Outlet />
}