import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import PageLoader from '../ui/PageLoader'
import StatusPage from '../ui/StatusPage'

export default function RequireAuth({ children, role }) {
  const { user, isAuthenticated, loading, sessionError, retrySession } = useAuth()
  const location = useLocation()

  if (loading) {
    return <PageLoader label="Loading your workspace…" />
  }

  if (sessionError && !isAuthenticated) {
    return (
      <StatusPage
        code="Offline"
        title="Could not verify your session"
        message={sessionError}
        primaryTo="/login"
        primaryLabel="Go to login"
        onRetry={retrySession}
      />
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  if (role && user?.role !== role) {
    return (
      <StatusPage
        code="403"
        title="Access denied"
        message="You do not have permission to view this page."
        primaryTo="/dashboard"
        primaryLabel="Back to dashboard"
      />
    )
  }

  return children
}
