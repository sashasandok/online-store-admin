import { Navigate, Outlet, useLocation } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '@/store/store'
import { getCurrentUser } from '@/store/slices/authSlice'
import { PageLoader } from '@/components/base'
import { useEffect } from 'react'

export interface ProtectedRouteProps {
  /** Where to redirect unauthenticated users */
  redirectTo?: string
  /** If false, route is only for guests (redirects authenticated users away) */
  requireAuth?: boolean
}

/**
 * React-Router protected route wrapper.
 * Usage:
 * <Route element={<ProtectedRoute />}>
 *   <Route path="/dashboard" element={<Dashboard />} />
 * </Route>
 */
export const ProtectedRoute = ({
  redirectTo = '/login',
  requireAuth = true,
}: ProtectedRouteProps) => {
  const location = useLocation()
  const dispatch = useDispatch<AppDispatch>()

  const { isAuthenticated, isLoading, token, user } = useSelector(
    (state: RootState) =>
      state.auth || {
        isAuthenticated: false,
        isLoading: false,
        token: null,
        user: null,
      }
  )

  // If we have a token but no user yet, fetch the current user.
  useEffect(() => {
    if (token && !user && !isLoading) {
      dispatch(getCurrentUser())
    }
  }, [token, user, isLoading, dispatch])

  // While verifying token/user
  if (isLoading || (token && !user)) {
    return <PageLoader text="Verifying authentication..." />
  }

  // Require auth guard
  if (requireAuth && !isAuthenticated) {
    return <Navigate to={redirectTo} replace state={{ from: location }} />
  }

  // Guest-only guard (e.g. login page)
  if (!requireAuth && isAuthenticated) {
    return <Navigate to="/dashboard/products" replace />
  }

  return <Outlet />
}
