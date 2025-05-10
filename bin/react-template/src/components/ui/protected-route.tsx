import { type FC } from 'react'
import { useCookies } from 'react-cookie'
import { Navigate, Outlet } from 'react-router'

interface ProtectedRouteProps {
  redirectTo?: string
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ redirectTo = '/auth' }) => {
  const [cookies] = useCookies(['session'])
  const sessionActive = cookies.session

  return sessionActive ? <Outlet /> : <Navigate to={redirectTo} replace />
}
