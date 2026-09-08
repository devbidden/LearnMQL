import { useEffect, useState } from 'react'
import * as authService from '../services/authService'
import { AuthContext } from './auth-context'

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [sessionError, setSessionError] = useState(null)

    async function restoreSession() {
        setLoading(true)
        setSessionError(null)
        try {
            const data = await authService.getMe()
            setUser(data ? data.user : null)
        } catch (err) {
            setUser(null)
            if (err.status && err.status !== 401) {
                setSessionError(err.message)
            } else if (!err.status) {
                setSessionError(err.message || 'Unable to reach the server.')
            }
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        restoreSession()
    }, [])

    async function login(credentials) {
        const data = await authService.login(credentials)
        setUser(data.user)
        setSessionError(null)
        return data
    }

    async function register(details) {
        const data = await authService.register(details)
        setUser(data.user)
        setSessionError(null)
        return data
    }

    async function logout() {
        try {
            await authService.logout()
        } catch {
            // still clear the local session
        }
        setUser(null)
    }

    async function verifyEmail(token) {
        const data = await authService.verifyEmail(token)
        setUser(data.user)
        setSessionError(null)
        return data
    }

    const value = {
        user,
        loading,
        sessionError,
        retrySession: restoreSession,
        isAuthenticated: Boolean(user),
        login,
        register,
        logout,
        forgotPassword: authService.forgotPassword,
        resetPassword: authService.resetPassword,
        verifyEmail,
        resendVerification: authService.resendVerification,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
