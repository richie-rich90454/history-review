import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

interface ProtectedRouteProps {
	children: React.ReactNode
	adminOnly?: boolean
}

export default function ProtectedRoute({ children, adminOnly = false }: ProtectedRouteProps) {
	const { user, isLoading } = useAuth()

	if (isLoading) {
		return <div className="container">Loading...</div>
	}

	if (!user) {
		return <Navigate to="/login" replace />
	}

	if (adminOnly && user.role !== 'admin') {
		return <Navigate to="/" replace />
	}

	return <>{children}</>
}