import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import './Login.css'

export default function Register() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)
	const { register } = useAuth()
	const navigate = useNavigate()

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setError('')
		if (password !== confirmPassword) {
			setError('Passwords do not match')
			return
		}
		setLoading(true)
		try {
			await register(email, password)
			navigate('/')
		} catch (err: any) {
			setError(err.message || 'Registration failed')
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="auth-container">
			<div className="auth-card">
				<h2 className="auth-title">Create an Account</h2>
				{error && <div className="error-alert">{error}</div>}
				<form onSubmit={handleSubmit}>
					<div className="form-group">
						<label htmlFor="email">Email</label>
						<input
							type="email"
							id="email"
							className="form-control"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</div>
					<div className="form-group">
						<label htmlFor="password">Password</label>
						<input
							type="password"
							id="password"
							className="form-control"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>
					<div className="form-group">
						<label htmlFor="confirmPassword">Confirm Password</label>
						<input
							type="password"
							id="confirmPassword"
							className="form-control"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							required
						/>
					</div>
					<button type="submit" className="btn btn-primary auth-submit" disabled={loading}>
						{loading ? 'Loading...' : 'Register'}
					</button>
				</form>
				<p className="auth-footer">
					Already have an account? <Link to="/login" className="auth-link">Login</Link>
				</p>
			</div>
		</div>
	)
}