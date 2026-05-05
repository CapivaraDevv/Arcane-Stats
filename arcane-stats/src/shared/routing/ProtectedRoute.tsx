import type { ReactElement } from 'react'
import { Navigate } from 'react-router-dom'
import useAuthContext from '../../features/auth/hooks/useAuth'

type ProtectedRouteProps = {
  children: ReactElement
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, initialized } = useAuthContext()
  if (!initialized) return null
  if (!user) return <Navigate to="/login" replace />
  return children
}

export default ProtectedRoute
