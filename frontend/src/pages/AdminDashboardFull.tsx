import { useEffect, useState } from "react";
import api from "../services/api";
import "./AdminDashboardFull.css";

interface Course {
	id: number;
	name: string;
	description: string;
}

interface Period {
	id: number;
	title: string;
	startYear: number;
	endYear: number;
	overview: string;
	course: { id: number };
}

interface Civilization {
	id: number;
	name: string;
	overview: string;
	startYear: number;
	endYear: number;
	period: { id: number };
}

interface Event {
	id: number;
	name: string;
	year: number;
	description: string;
	significance: string;
	period?: { id: number };
	civilization?: { id: number };
}

interface Evidence {
	id: number;
	title: string;
	description: string;
	type: string;
	source: string;
	significance: string;
	civilization: { id: number };
	theme: { id: number };
}

interface Person {
	id: number;
	name: string;
	birthYear: number;
	deathYear: number;
	biography: string;
	civilization: { id: number };
}

interface Theme {
	id: number;
	name: string;
	description: string;
}

type TabType =
	| "courses"
	| "periods"
	| "civilizations"
	| "events"
	| "evidence"
	| "people"
	| "themes";

export default function AdminDashboardFull() {
	const [activeTab, setActiveTab] = useState<TabType>("courses");
	const [courses, setCourses] = useState<Course[]>([]);
	const [periods, setPeriods] = useState<Period[]>([]);
	const [civilizations, setCivilizations] = useState<Civilization[]>([]);
	const [events, setEvents] = useState<Event[]>([]);
	const [evidence, setEvidence] = useState<Evidence[]>([]);
	const [people, setPeople] = useState<Person[]>([]);
	const [themes, setThemes] = useState<Theme[]>([]);
	const [loading, setLoading] = useState(false);

	const fetchData = async () => {
		setLoading(true);
		try {
			const [c, p, civ, e, ev, pe, t] = await Promise.all([
				api.get("public/courses").json<Course[]>(),
				api.get("admin/periods/all").json<Period[]>(),
				api.get("admin/civilizations/all").json<Civilization[]>(),
				api.get("admin/events/all").json<Event[]>(),
				api.get("admin/evidence/all").json<Evidence[]>(),
				api.get("admin/people/all").json<Person[]>(),
				api.get("public/themes").json<Theme[]>(),
			]);
			setCourses(c);
			setPeriods(p);
			setCivilizations(civ);
			setEvents(e);
			setEvidence(ev);
			setPeople(pe);
			setThemes(t);
		} catch (err) {
			console.error(err);
			alert("Failed to load data");
		}
		setLoading(false);
	};

	useEffect(() => {
		fetchData();
	}, []);

	const handleDelete = async (type: string, id: number) => {
		if (!confirm(`Delete this ${type.slice(0, -1)}?`)) return;
		try {
			await api.delete(`admin/${type}/${id}`);
			fetchData();
		} catch (err) {
			alert("Delete failed");
		}
	};

	const renderCreateForm = () => {
		switch (activeTab) {
			case "courses":
				return <CreateCourseForm onSuccess={fetchData} />;
			case "periods":
				return <CreatePeriodForm courses={courses} onSuccess={fetchData} />;
			case "civilizations":
				return <CreateCivilizationForm periods={periods} onSuccess={fetchData} />;
			case "events":
				return (
					<CreateEventForm
						periods={periods}
						civilizations={civilizations}
						onSuccess={fetchData}
					/>
				);
			case "evidence":
				return (
					<CreateEvidenceForm
						civilizations={civilizations}
						themes={themes}
						onSuccess={fetchData}
					/>
				);
			case "people":
				return <CreatePersonForm civilizations={civilizations} onSuccess={fetchData} />;
			case "themes":
				return <CreateThemeForm onSuccess={fetchData} />;
			default:
				return null;
		}
	};

	const renderTable = () => {
		if (loading) return <p>Loading...</p>;

		switch (activeTab) {
			case "courses":
				return (
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
							{courses.map((c) => (
								<tr key={c.id}>
									<td>{c.id}</td>
									<td>{c.name}</td>
									<td>{c.description}</td>
									<td>
										<button
											className="btn btn-danger"
											onClick={() => handleDelete("courses", c.id)}
										>
											Delete
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				);
			case "periods":
				return (
					<table className="admin-table">
						<thead>
							<tr>
								<th>ID</th>
								<th>Title</th>
								<th>Years</th>
								<th>Course ID</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{periods.map((p) => (
								<tr key={p.id}>
									<td>{p.id}</td>
									<td>{p.title}</td>
									<td>
										{p.startYear}–{p.endYear}
									</td>
									<td>{p.course?.id}</td>
									<td>
										<button
											className="btn btn-danger"
											onClick={() => handleDelete("periods", p.id)}
										>
											Delete
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				);
			case "civilizations":
				return (
					<table className="admin-table">
						<thead>
							<tr>
								<th>ID</th>
								<th>Name</th>
								<th>Years</th>
								<th>Period ID</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{civilizations.map((c) => (
								<tr key={c.id}>
									<td>{c.id}</td>
									<td>{c.name}</td>
									<td>
										{c.startYear}–{c.endYear}
									</td>
									<td>{c.period?.id}</td>
									<td>
										<button
											className="btn btn-danger"
											onClick={() => handleDelete("civilizations", c.id)}
										>
											Delete
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				);
			case "events":
				return (
					<table className="admin-table">
						<thead>
							<tr>
								<th>ID</th>
								<th>Name</th>
								<th>Year</th>
								<th>Period/Civ</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{events.map((e) => (
								<tr key={e.id}>
									<td>{e.id}</td>
									<td>{e.name}</td>
									<td>{e.year}</td>
									<td>{e.period?.id || e.civilization?.id || "—"}</td>
									<td>
										<button
											className="btn btn-danger"
											onClick={() => handleDelete("events", e.id)}
										>
											Delete
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				);
			case "evidence":
				return (
					<table className="admin-table">
						<thead>
							<tr>
								<th>ID</th>
								<th>Title</th>
								<th>Type</th>
								<th>Theme ID</th>
								<th>Civilization ID</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{evidence.map((e) => (
								<tr key={e.id}>
									<td>{e.id}</td>
									<td>{e.title}</td>
									<td>{e.type}</td>
									<td>{e.theme?.id}</td>
									<td>{e.civilization?.id}</td>
									<td>
										<button
											className="btn btn-danger"
											onClick={() => handleDelete("evidence", e.id)}
										>
											Delete
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				);
			case "people":
				return (
					<table className="admin-table">
						<thead>
							<tr>
								<th>ID</th>
								<th>Name</th>
								<th>Birth–Death</th>
								<th>Civilization ID</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{people.map((p) => (
								<tr key={p.id}>
									<td>{p.id}</td>
									<td>{p.name}</td>
									<td>
										{p.birthYear}–{p.deathYear}
									</td>
									<td>{p.civilization?.id}</td>
									<td>
										<button
											className="btn btn-danger"
											onClick={() => handleDelete("people", p.id)}
										>
											Delete
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				);
			case "themes":
				return (
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
							{themes.map((t) => (
								<tr key={t.id}>
									<td>{t.id}</td>
									<td>{t.name}</td>
									<td>{t.description}</td>
									<td>
										<button
											className="btn btn-danger"
											onClick={() => handleDelete("themes", t.id)}
										>
											Delete
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				);
			default:
				return null;
		}
	};

	return (
		<div className="admin-dashboard-full">
			<h1 className="admin-title">Admin Dashboard</h1>
			<div className="admin-tabs">
				{[
					"courses",
					"periods",
					"civilizations",
					"events",
					"evidence",
					"people",
					"themes",
				].map((tab) => (
					<button
						key={tab}
						className={`admin-tab ${activeTab === tab ? "active" : ""}`}
						onClick={() => setActiveTab(tab as TabType)}
					>
						{tab.charAt(0).toUpperCase() + tab.slice(1)}
					</button>
				))}
			</div>
			<div className="admin-create-section">
				<h3>Create New {activeTab.slice(0, -1)}</h3>
				{renderCreateForm()}
			</div>
			<div className="admin-tab-content">
				<h3>Existing {activeTab}</h3>
				{renderTable()}
			</div>
		</div>
	);
}

function CreateCourseForm({ onSuccess }: { onSuccess: () => void }) {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		try {
			await api.post("admin/courses", { json: { name, description } });
			setName("");
			setDescription("");
			onSuccess();
		} catch (err) {
			alert("Failed to create course");
		}
		setLoading(false);
	};

	return (
		<form onSubmit={handleSubmit} className="create-form">
			<input
				type="text"
				placeholder="Name"
				value={name}
				onChange={(e) => setName(e.target.value)}
				required
			/>
			<textarea
				placeholder="Description"
				value={description}
				onChange={(e) => setDescription(e.target.value)}
			/>
			<button type="submit" className="btn btn-primary" disabled={loading}>
				Create Course
			</button>
		</form>
	);
}

function CreatePeriodForm({ courses, onSuccess }: { courses: Course[]; onSuccess: () => void }) {
	const [title, setTitle] = useState("");
	const [startYear, setStartYear] = useState("");
	const [endYear, setEndYear] = useState("");
	const [overview, setOverview] = useState("");
	const [courseId, setCourseId] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const parsedCourseId = parseInt(courseId);
		if (!courseId || isNaN(parsedCourseId)) {
			alert("Please select a course");
			return;
		}
		setLoading(true);
		try {
			await api.post("admin/periods", {
				json: {
					title,
					startYear: startYear ? parseInt(startYear) : null,
					endYear: endYear ? parseInt(endYear) : null,
					overview,
					courseId: parsedCourseId,
				},
			});
			setTitle("");
			setStartYear("");
			setEndYear("");
			setOverview("");
			setCourseId("");
			onSuccess();
		} catch (err) {
			alert("Failed to create period");
		}
		setLoading(false);
	};

	return (
		<form onSubmit={handleSubmit} className="create-form">
			<input
				type="text"
				placeholder="Title"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				required
			/>
			<input
				type="number"
				placeholder="Start Year"
				value={startYear}
				onChange={(e) => setStartYear(e.target.value)}
			/>
			<input
				type="number"
				placeholder="End Year"
				value={endYear}
				onChange={(e) => setEndYear(e.target.value)}
			/>
			<textarea
				placeholder="Overview"
				value={overview}
				onChange={(e) => setOverview(e.target.value)}
			/>
			<select value={courseId} onChange={(e) => setCourseId(e.target.value)} required>
				<option value="">Select Course</option>
				{courses.map((c) => (
					<option key={c.id} value={c.id}>
						{c.name}
					</option>
				))}
			</select>
			<button type="submit" className="btn btn-primary" disabled={loading}>
				Create Period
			</button>
		</form>
	);
}

function CreateCivilizationForm({
	periods,
	onSuccess,
}: {
	periods: Period[];
	onSuccess: () => void;
}) {
	const [name, setName] = useState("");
	const [overview, setOverview] = useState("");
	const [startYear, setStartYear] = useState("");
	const [endYear, setEndYear] = useState("");
	const [periodId, setPeriodId] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const parsedPeriodId = parseInt(periodId);
		if (!periodId || isNaN(parsedPeriodId)) {
			alert("Please select a period");
			return;
		}
		setLoading(true);
		try {
			await api.post("admin/civilizations", {
				json: {
					name,
					overview,
					startYear: startYear ? parseInt(startYear) : null,
					endYear: endYear ? parseInt(endYear) : null,
					periodId: parsedPeriodId,
				},
			});
			setName("");
			setOverview("");
			setStartYear("");
			setEndYear("");
			setPeriodId("");
			onSuccess();
		} catch (err) {
			alert("Failed to create civilization");
		}
		setLoading(false);
	};

	return (
		<form onSubmit={handleSubmit} className="create-form">
			<input
				type="text"
				placeholder="Name"
				value={name}
				onChange={(e) => setName(e.target.value)}
				required
			/>
			<textarea
				placeholder="Overview"
				value={overview}
				onChange={(e) => setOverview(e.target.value)}
			/>
			<input
				type="number"
				placeholder="Start Year"
				value={startYear}
				onChange={(e) => setStartYear(e.target.value)}
			/>
			<input
				type="number"
				placeholder="End Year"
				value={endYear}
				onChange={(e) => setEndYear(e.target.value)}
			/>
			<select value={periodId} onChange={(e) => setPeriodId(e.target.value)} required>
				<option value="">Select Period</option>
				{periods.map((p) => (
					<option key={p.id} value={p.id}>
						{p.title}
					</option>
				))}
			</select>
			<button type="submit" className="btn btn-primary" disabled={loading}>
				Create Civilization
			</button>
		</form>
	);
}

function CreateEventForm({
	periods,
	civilizations,
	onSuccess,
}: {
	periods: Period[];
	civilizations: Civilization[];
	onSuccess: () => void;
}) {
	const [name, setName] = useState("");
	const [year, setYear] = useState("");
	const [description, setDescription] = useState("");
	const [significance, setSignificance] = useState("");
	const [periodId, setPeriodId] = useState("");
	const [civilizationId, setCivilizationId] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		const payload: any = {
			name,
			year: year ? parseInt(year) : null,
			description,
			significance,
		};
		if (periodId) payload.periodId = parseInt(periodId);
		if (civilizationId) payload.civilizationId = parseInt(civilizationId);
		try {
			await api.post("admin/events", { json: payload });
			setName("");
			setYear("");
			setDescription("");
			setSignificance("");
			setPeriodId("");
			setCivilizationId("");
			onSuccess();
		} catch (err) {
			alert("Failed to create event");
		}
		setLoading(false);
	};

	return (
		<form onSubmit={handleSubmit} className="create-form">
			<input
				type="text"
				placeholder="Name"
				value={name}
				onChange={(e) => setName(e.target.value)}
				required
			/>
			<input
				type="number"
				placeholder="Year"
				value={year}
				onChange={(e) => setYear(e.target.value)}
				required
			/>
			<textarea
				placeholder="Description"
				value={description}
				onChange={(e) => setDescription(e.target.value)}
			/>
			<input
				type="text"
				placeholder="Significance"
				value={significance}
				onChange={(e) => setSignificance(e.target.value)}
			/>
			<select value={periodId} onChange={(e) => setPeriodId(e.target.value)}>
				<option value="">Select Period (optional)</option>
				{periods.map((p) => (
					<option key={p.id} value={p.id}>
						{p.title}
					</option>
				))}
			</select>
			<select value={civilizationId} onChange={(e) => setCivilizationId(e.target.value)}>
				<option value="">Select Civilization (optional)</option>
				{civilizations.map((c) => (
					<option key={c.id} value={c.id}>
						{c.name}
					</option>
				))}
			</select>
			<button type="submit" className="btn btn-primary" disabled={loading}>
				Create Event
			</button>
		</form>
	);
}

function CreateEvidenceForm({
	civilizations,
	themes,
	onSuccess,
}: {
	civilizations: Civilization[];
	themes: Theme[];
	onSuccess: () => void;
}) {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [type, setType] = useState("");
	const [source, setSource] = useState("");
	const [significance, setSignificance] = useState("");
	const [civilizationId, setCivilizationId] = useState("");
	const [themeId, setThemeId] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const parsedCivId = parseInt(civilizationId);
		const parsedThemeId = parseInt(themeId);
		if (!civilizationId || isNaN(parsedCivId) || !themeId || isNaN(parsedThemeId)) {
			alert("Please select civilization and theme");
			return;
		}
		setLoading(true);
		try {
			await api.post("evidence/admin", {
				json: {
					title,
					description,
					type,
					source,
					significance,
					civilizationId: parsedCivId,
					themeId: parsedThemeId,
				},
			});
			setTitle("");
			setDescription("");
			setType("");
			setSource("");
			setSignificance("");
			setCivilizationId("");
			setThemeId("");
			onSuccess();
		} catch (err) {
			alert("Failed to create evidence");
		}
		setLoading(false);
	};

	return (
		<form onSubmit={handleSubmit} className="create-form">
			<input
				type="text"
				placeholder="Title"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				required
			/>
			<textarea
				placeholder="Description"
				value={description}
				onChange={(e) => setDescription(e.target.value)}
			/>
			<input
				type="text"
				placeholder="Type (e.g., LEQ)"
				value={type}
				onChange={(e) => setType(e.target.value)}
			/>
			<input
				type="text"
				placeholder="Source"
				value={source}
				onChange={(e) => setSource(e.target.value)}
			/>
			<input
				type="text"
				placeholder="Significance"
				value={significance}
				onChange={(e) => setSignificance(e.target.value)}
			/>
			<select
				value={civilizationId}
				onChange={(e) => setCivilizationId(e.target.value)}
				required
			>
				<option value="">Select Civilization</option>
				{civilizations.map((c) => (
					<option key={c.id} value={c.id}>
						{c.name}
					</option>
				))}
			</select>
			<select value={themeId} onChange={(e) => setThemeId(e.target.value)} required>
				<option value="">Select Theme</option>
				{themes.map((t) => (
					<option key={t.id} value={t.id}>
						{t.name}
					</option>
				))}
			</select>
			<button type="submit" className="btn btn-primary" disabled={loading}>
				Create Evidence
			</button>
		</form>
	);
}

function CreatePersonForm({
	civilizations,
	onSuccess,
}: {
	civilizations: Civilization[];
	onSuccess: () => void;
}) {
	const [name, setName] = useState("");
	const [birthYear, setBirthYear] = useState("");
	const [deathYear, setDeathYear] = useState("");
	const [biography, setBiography] = useState("");
	const [civilizationId, setCivilizationId] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const parsedCivId = parseInt(civilizationId);
		if (!civilizationId || isNaN(parsedCivId)) {
			alert("Please select a civilization");
			return;
		}
		setLoading(true);
		try {
			await api.post("admin/people", {
				json: {
					name,
					birthYear: birthYear ? parseInt(birthYear) : null,
					deathYear: deathYear ? parseInt(deathYear) : null,
					biography,
					civilizationId: parsedCivId,
				},
			});
			setName("");
			setBirthYear("");
			setDeathYear("");
			setBiography("");
			setCivilizationId("");
			onSuccess();
		} catch (err) {
			alert("Failed to create person");
		}
		setLoading(false);
	};

	return (
		<form onSubmit={handleSubmit} className="create-form">
			<input
				type="text"
				placeholder="Name"
				value={name}
				onChange={(e) => setName(e.target.value)}
				required
			/>
			<input
				type="number"
				placeholder="Birth Year"
				value={birthYear}
				onChange={(e) => setBirthYear(e.target.value)}
			/>
			<input
				type="number"
				placeholder="Death Year"
				value={deathYear}
				onChange={(e) => setDeathYear(e.target.value)}
			/>
			<textarea
				placeholder="Biography"
				value={biography}
				onChange={(e) => setBiography(e.target.value)}
			/>
			<select
				value={civilizationId}
				onChange={(e) => setCivilizationId(e.target.value)}
				required
			>
				<option value="">Select Civilization</option>
				{civilizations.map((c) => (
					<option key={c.id} value={c.id}>
						{c.name}
					</option>
				))}
			</select>
			<button type="submit" className="btn btn-primary" disabled={loading}>
				Create Person
			</button>
		</form>
	);
}

function CreateThemeForm({ onSuccess }: { onSuccess: () => void }) {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		try {
			await api.post("admin/themes", { json: { name, description } });
			setName("");
			setDescription("");
			onSuccess();
		} catch (err) {
			alert("Failed to create theme");
		}
		setLoading(false);
	};

	return (
		<form onSubmit={handleSubmit} className="create-form">
			<input
				type="text"
				placeholder="Name"
				value={name}
				onChange={(e) => setName(e.target.value)}
				required
			/>
			<textarea
				placeholder="Description"
				value={description}
				onChange={(e) => setDescription(e.target.value)}
			/>
			<button type="submit" className="btn btn-primary" disabled={loading}>
				Create Theme
			</button>
		</form>
	);
}
