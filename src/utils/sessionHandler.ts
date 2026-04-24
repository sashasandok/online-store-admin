import type { AppDispatch } from '../store/store'
import { clearAuth } from '../store/slices/authSlice'

let store: { dispatch: AppDispatch } | null = null
let navigate: ((path: string) => void) | null = null
let showNotification:
  | ((message: string, type: 'error' | 'success') => void)
  | null = null

export const initSessionHandler = (deps: {
  dispatch: AppDispatch
  navigate: (path: string) => void
  showNotification?: (message: string, type: 'error' | 'success') => void
}) => {
  store = { dispatch: deps.dispatch }
  navigate = deps.navigate
  showNotification = deps.showNotification || null
}

export const handleSessionExpired = () => {
  if (!store || !navigate) {
    console.error('Session handler not initialized')
    return
  }

  if (showNotification) {
    showNotification('Your session has expired. Please log in again.', 'error')
  }

  const currentPath = window.location.pathname
  if (currentPath !== '/login' && currentPath !== '/') {
    sessionStorage.setItem('redirectAfterLogin', currentPath)
  }

  localStorage.removeItem('access_token')

  store!.dispatch(clearAuth())

  navigate('/login')
}

export const getRedirectPath = (): string => {
  const redirectPath = sessionStorage.getItem('redirectAfterLogin')
  if (redirectPath) {
    sessionStorage.removeItem('redirectAfterLogin')
    return redirectPath
  }
  return '/dashboard'
}
