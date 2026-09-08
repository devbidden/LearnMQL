import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import { useAuth } from '../../hooks/useAuth'

export default function Layout() {
  const { sessionError, retrySession, isAuthenticated } = useAuth()

  return (
    <div className="flex min-h-screen flex-col bg-page text-fg">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-[#00d181] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[#0b0e11]"
      >
        Skip to content
      </a>
      <Navbar />
      {sessionError && !isAuthenticated && (
        <div className="border-b border-amber-500/20 bg-amber-500/10 px-5 py-2.5 text-center text-sm text-amber-200">
          {sessionError}{' '}
          <button type="button" onClick={retrySession} className="font-semibold underline underline-offset-2">
            Retry
          </button>
        </div>
      )}
      <main id="main-content" className="flex-1" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
