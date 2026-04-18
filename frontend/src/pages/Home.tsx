import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import "./Home.css";

interface Course {
	id: number;
	name: string;
	description: string;
}

export default function Home() {
	const [courses, setCourses] = useState<Course[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		api.get("public/courses")
			.json<Course[]>()
			.then(setCourses)
			.catch(() => setError("Failed to load courses"))
			.finally(() => setLoading(false));
	}, []);

	if (loading) {
		return <div className="container">Loading courses...</div>;
	}

	if (error) {
		return <div className="container error-alert">{error}</div>;
	}

	return (
		<div className="container">
			<h1 className="home-title">AP History Courses</h1>
			<div className="course-grid">
				{courses.map((course) => (
					<Link to={`/courses/${course.id}`} key={course.id} className="course-card">
						<h2 className="course-name">{course.name}</h2>
						<p className="course-description">{course.description}</p>
					</Link>
				))}
				{courses.length === 0 && (
					<p className="text-secondary text-center" style={{ gridColumn: "1/-1" }}>
						No courses available yet.
					</p>
				)}
			</div>
		</div>
	);
}
