import { Link, useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { ThemeToggle, Button } from '@/components'
import type { RootState } from '@/store/store'
import { clearAuth } from '@/store/slices/authSlice'

export const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)

  const handleLogout = () => dispatch(clearAuth())

  return (
    <div className="w-full h-15 bg-(--color-surface) text-(--color-text) flex items-center justify-between px-5 border-b border-(--color-border) box-border">
      <div className="flex items-center gap-4">
        <Link
          to="/"
          className="text-(--color-text) no-underline font-semibold hover:underline"
        >
          Home
        </Link>
        {isAuthenticated && (
          <Link
            to="/dashboard"
            className="text-(--color-text) no-underline font-semibold hover:underline"
          >
            Dashboard
          </Link>
        )}
      </div>
      <div className="flex items-center gap-3">
        <ThemeToggle />
        {isAuthenticated ? (
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <Button variant="primary" onClick={() => navigate('/login')}>
            Login
          </Button>
        )}
      </div>
    </div>
  )
}
