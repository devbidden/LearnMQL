import StatusPage from '../components/ui/StatusPage'

export default function NotFound({
  title = 'Page not found',
  message = 'This page does not exist or the link is out of date.',
  primaryTo = '/',
  primaryLabel = 'Back home',
  secondaryTo = '/courses',
  secondaryLabel = 'Browse courses',
}) {
  return (
    <StatusPage
      code="404"
      title={title}
      message={message}
      primaryTo={primaryTo}
      primaryLabel={primaryLabel}
      secondaryTo={secondaryTo}
      secondaryLabel={secondaryLabel}
    />
  )
}
