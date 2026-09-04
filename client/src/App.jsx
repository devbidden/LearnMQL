import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import RouteOutlet from './components/layout/RouteOutlet'
import RequireAuth from './components/auth/RequireAuth'
import ErrorBoundary from './components/ErrorBoundary'
import Home from './pages/Home'
import Bots from './pages/Bots'
import Courses from './pages/Courses'
import CourseDetail from './pages/CourseDetail'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import VerifyEmail from './pages/VerifyEmail'
import Dashboard from './pages/Dashboard'
import LearnCourse from './pages/LearnCourse'
import Lesson from './pages/Lesson'
import AdminDashboard from './pages/AdminDashboard'
import AdminCourseEditor from './pages/AdminCourseEditor'
import PaymentCallback from './pages/PaymentCallback'
import NotFound from './pages/NotFound'
import ErrorPage from './pages/ErrorPage'
import { AuthProvider } from './context/AuthContext'
import { ProgressProvider } from './context/ProgressContext'
import { ThemeProvider } from './context/ThemeContext'

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
      <AuthProvider>
        <ProgressProvider>
          <BrowserRouter>
            <ErrorBoundary>
              <Routes>
                <Route element={<Layout />}>
                  <Route element={<RouteOutlet />} errorElement={<ErrorPage />}>
                    <Route index element={<Home />} />
                    <Route path="bots" element={<Bots />} />
                    <Route path="courses" element={<Courses />} />
                    <Route path="courses/:slug" element={<CourseDetail />} />
                    <Route path="about" element={<About />} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="forgot-password" element={<ForgotPassword />} />
                    <Route path="reset-password/:token" element={<ResetPassword />} />
                    <Route path="verify-email/:token" element={<VerifyEmail />} />
                    <Route
                      path="payment/callback"
                      element={
                        <RequireAuth>
                          <PaymentCallback />
                        </RequireAuth>
                      }
                    />
                    <Route
                      path="dashboard"
                      element={
                        <RequireAuth>
                          <Dashboard />
                        </RequireAuth>
                      }
                    />
                    <Route
                      path="dashboard/courses/:slug"
                      element={
                        <RequireAuth>
                          <LearnCourse />
                        </RequireAuth>
                      }
                    />
                    <Route
                      path="dashboard/courses/:slug/lessons/:lessonId"
                      element={
                        <RequireAuth>
                          <Lesson />
                        </RequireAuth>
                      }
                    />
                    <Route
                      path="admin"
                      element={
                        <RequireAuth role="admin">
                          <AdminDashboard />
                        </RequireAuth>
                      }
                    />
                    <Route
                      path="admin/courses/:id"
                      element={
                        <RequireAuth role="admin">
                          <AdminCourseEditor />
                        </RequireAuth>
                      }
                    />
                    <Route path="*" element={<NotFound />} />
                  </Route>
                </Route>
              </Routes>
            </ErrorBoundary>
          </BrowserRouter>
        </ProgressProvider>
      </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}
