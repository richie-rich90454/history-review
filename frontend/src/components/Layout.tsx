import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./Layout.css";

export default function Layout() {
	const { user, logout } = useAuth();

	return (
		<div className="app">
			<nav className="navbar">
				<div className="container navbar-content">
					<Link to="/" className="navbar-brand">
						AP History Review
					</Link>
					<div className="navbar-links">
						{user ? (
							<>
								<span className="navbar-user">Welcome, {user.email}</span>
								{user.role === "admin" && (
									<Link to="/admin" className="navbar-link">
										Admin
									</Link>
								)}
								<button onClick={logout} className="navbar-link">
									Logout
								</button>
							</>
						) : (
							<>
								<Link to="/login" className="navbar-link">
									Login
								</Link>
								<Link to="/register" className="navbar-link">
									Register
								</Link>
							</>
						)}
					</div>
				</div>
			</nav>
			<main className="container">
				<Outlet />
			</main>
		</div>
	);
}
