import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { navLinks } from '../../data/mockData'
import { useAuth } from '../../hooks/useAuth'
import { useTheme } from '../../context/ThemeContext'
import Spinner from '../ui/Spinner'
import BrandLogo from './BrandLogo'

function navClass(isActive) {
  return `rounded-full px-3.5 py-2 text-sm font-medium transition ${
    isActive ? 'bg-[#00d181]/10 text-[#00d181]' : 'text-muted hover:text-fg'
  }`
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { user, isAuthenticated, loading, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()

  async function handleLogout() {
    await logout()
    setOpen(false)
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-[color:var(--lm-nav)] backdrop-blur-xl">
      <div className="mx-auto flex h-[4.25rem] max-w-7xl items-center justify-between px-5 lg:px-8">
        <BrandLogo onClick={() => setOpen(false)} />

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Main navigation">
          {navLinks.map(({ to, label }) => (
            <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => navClass(isActive)}>
              {label}
            </NavLink>
          ))}
          {isAuthenticated && (
            <NavLink to="/dashboard" className={({ isActive }) => navClass(isActive)}>
              My courses
            </NavLink>
          )}
          {user?.role === 'admin' && (
            <NavLink to="/admin" className={({ isActive }) => navClass(isActive)}>
              Admin
            </NavLink>
          )}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <button
            type="button"
            onClick={toggleTheme}
            className="grid h-10 w-10 place-items-center rounded-full text-muted transition hover:bg-card hover:text-fg"
            aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          {loading ? (
            <Spinner className="h-5 w-5 text-[#00d181]" />
          ) : isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                className="rounded-full px-3 py-2 text-sm font-medium text-muted transition hover:text-fg"
              >
                Hi, {user?.name?.split(' ')[0]}
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-full bg-[#00d181] px-4 py-2 text-sm font-semibold text-[#0b0e11] transition hover:bg-[#00e891]"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-full border border-line px-4 py-2 text-sm font-medium text-fg transition hover:border-[#00d181]/40"
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="rounded-full bg-[#00d181] px-4 py-2 text-sm font-semibold text-[#0b0e11] transition hover:bg-[#00e891]"
              >
                Get started
              </Link>
            </>
          )}
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <button
            type="button"
            onClick={toggleTheme}
            className="grid h-10 w-10 place-items-center text-muted"
            aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center text-muted"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-line bg-page px-5 py-4 lg:hidden">
          <nav className="flex flex-col gap-1">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-3 text-sm font-medium ${isActive ? 'bg-[#00d181]/10 text-[#00d181]' : 'text-muted'}`
                }
              >
                {label}
              </NavLink>
            ))}
            {isAuthenticated && (
              <NavLink
                to="/dashboard"
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-3 text-sm font-medium ${isActive ? 'bg-[#00d181]/10 text-[#00d181]' : 'text-muted'}`
                }
              >
                My courses
              </NavLink>
            )}
            {user?.role === 'admin' && (
              <NavLink
                to="/admin"
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-3 text-sm font-medium ${isActive ? 'bg-[#00d181]/10 text-[#00d181]' : 'text-muted'}`
                }
              >
                Admin
              </NavLink>
            )}
          </nav>
          <div className="mt-4 flex flex-col gap-2 border-t border-line pt-4">
            {loading ? (
              <div className="flex justify-center py-2">
                <Spinner className="h-5 w-5 text-[#00d181]" />
              </div>
            ) : isAuthenticated ? (
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-full bg-[#00d181] px-4 py-3 text-center text-sm font-semibold text-[#0b0e11]"
              >
                Log out
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="rounded-full border border-line px-4 py-3 text-center text-sm font-medium text-fg"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  onClick={() => setOpen(false)}
                  className="rounded-full bg-[#00d181] px-4 py-3 text-center text-sm font-semibold text-[#0b0e11]"
                >
                  Get started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
