import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CourseDetail from "./pages/CourseDetail";
import SubmitContent from "./pages/SubmitContent";
import AdminDashboardFull from "./pages/AdminDashboardFull";
import AdminApprovals from "./pages/AdminApprovals";

function App() {
	return (
		<AuthProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route index element={<Home />} />
						<Route path="login" element={<Login />} />
						<Route path="register" element={<Register />} />
						<Route path="courses/:courseId" element={<CourseDetail />} />
						<Route
							path="submit"
							element={
								<ProtectedRoute>
									<SubmitContent />
								</ProtectedRoute>
							}
						/>
						<Route
							path="admin"
							element={
								<ProtectedRoute adminOnly>
									<AdminDashboardFull />
								</ProtectedRoute>
							}
						/>
						<Route
							path="admin/approvals"
							element={
								<ProtectedRoute adminOnly>
									<AdminApprovals />
								</ProtectedRoute>
							}
						/>
					</Route>
				</Routes>
			</BrowserRouter>
		</AuthProvider>
	);
}

export default App;
