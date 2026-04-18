import { useEffect, useState } from "react";
import api from "../services/api";
import "./AdminDashboard.css";

interface Course {
	id: number;
	name: string;
	description: string;
}

export default function AdminDashboard() {
	const [courses, setCourses] = useState<Course[]>([]);
	const [newCourse, setNewCourse] = useState({ name: "", description: "" });
	const [loading, setLoading] = useState(false);

	const fetchCourses = () => {
		api.get("public/courses").json<Course[]>().then(setCourses);
	};

	useEffect(fetchCourses, []);

	const handleCreateCourse = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		try {
			await api.post("admin/courses", { json: newCourse });
			setNewCourse({ name: "", description: "" });
			fetchCourses();
		} catch (err) {
			alert("Failed to create course");
		} finally {
			setLoading(false);
		}
	};

	const handleDeleteCourse = async (id: number) => {
		if (!confirm("Delete this course?")) return;
		try {
			await api.delete(`admin/courses/${id}`);
			fetchCourses();
		} catch (err) {
			alert("Failed to delete course");
		}
	};

	return (
		<div className="admin-dashboard">
			<h1 className="admin-title">Admin Dashboard</h1>

			<section className="admin-section">
				<h2 className="section-title">Create New Course</h2>
				<form onSubmit={handleCreateCourse} className="admin-form">
					<div className="form-group">
						<label>Name</label>
						<input
							type="text"
							className="form-control"
							value={newCourse.name}
							onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
							required
						/>
					</div>
					<div className="form-group">
						<label>Description</label>
						<textarea
							className="form-control"
							rows={3}
							value={newCourse.description}
							onChange={(e) =>
								setNewCourse({ ...newCourse, description: e.target.value })
							}
						/>
					</div>
					<button type="submit" className="btn btn-primary" disabled={loading}>
						Create Course
					</button>
				</form>
			</section>

			<section className="admin-section">
				<h2 className="section-title">Manage Courses</h2>
				<table className="admin-table">
					<thead>
						<tr>
							<th>ID</th>
							<th>Name</th>
							<th>Description</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{courses.map((course) => (
							<tr key={course.id}>
								<td>{course.id}</td>
								<td>{course.name}</td>
								<td>{course.description}</td>
								<td>
									<button
										className="btn btn-danger"
										onClick={() => handleDeleteCourse(course.id)}
									>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</section>
		</div>
	);
}
