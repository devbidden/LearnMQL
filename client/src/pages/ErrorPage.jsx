import { isRouteErrorResponse, useRouteError } from 'react-router-dom'
import StatusPage from '../components/ui/StatusPage'

export default function ErrorPage() {
  const error = useRouteError()

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return (
        <StatusPage
          code="404"
          title="Page not found"
          message="This page does not exist or the link is out of date."
          primaryTo="/"
          primaryLabel="Back home"
          secondaryTo="/courses"
          secondaryLabel="Browse courses"
        />
      )
    }

    return (
      <StatusPage
        code={String(error.status)}
        title={error.statusText || 'Something went wrong'}
        message={
          (typeof error.data === 'string' && error.data) ||
          error.data?.message ||
          'The server returned an error. You can try again or head back home.'
        }
        primaryTo="/"
        primaryLabel="Back home"
        onRetry={() => window.location.reload()}
      />
    )
  }

  const message =
    error instanceof Error
      ? error.message
      : 'An unexpected error stopped this page from loading.'

  return (
    <StatusPage
      code="Error"
      title="Something went wrong"
      message={message}
      primaryTo="/"
      primaryLabel="Back home"
      onRetry={() => window.location.reload()}
    />
  )
}
