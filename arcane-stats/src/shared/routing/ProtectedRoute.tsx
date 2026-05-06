import type { ReactElement } from 'react'
import { Navigate } from 'react-router-dom'
import useAuthContext from '../../features/auth/hooks/useAuth'
import LoadingScreen from '../ui/LoadingScreen'

type ProtectedRouteProps = {
  children: ReactElement
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, initialized } = useAuthContext()
  if (!initialized) { return <LoadingScreen /> }
  if (!user) return <Navigate to="/login" replace />
  return children
}

export default ProtectedRoute
