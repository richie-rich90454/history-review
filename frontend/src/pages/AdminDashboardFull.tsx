import { useEffect, useState } from 'react'
import api from '../services/api'
import './AdminDashboardFull.css'

interface Course {
	id: number
	name: string
	description: string
}

interface Period {
	id: number
	title: string
	startYear: number
	endYear: number
	overview: string
	course: { id: number }
}

interface Civilization {
	id: number
	name: string
	overview: string
	startYear: number
	endYear: number
	period: { id: number }
}

interface Event {
	id: number
	name: string
	year: number
	description: string
	significance: string
	period?: { id: number }
	civilization?: { id: number }
}

interface Evidence {
	id: number
	title: string
	description: string
	type: string
	source: string
	significance: string
	civilization: { id: number }
	theme: { id: number }
}

interface Person {
	id: number
	name: string
	birthYear: number
	deathYear: number
	biography: string
	civilization: { id: number }
}

interface Theme {
	id: number
	name: string
	description: string
}

type TabType = 'courses' | 'periods' | 'civilizations' | 'events' | 'evidence' | 'people' | 'themes'

export default function AdminDashboardFull() {
	const [activeTab, setActiveTab] = useState<TabType>('courses')
	const [courses, setCourses] = useState<Course[]>([])
	const [periods, setPeriods] = useState<Period[]>([])
	const [civilizations, setCivilizations] = useState<Civilization[]>([])
	const [events, setEvents] = useState<Event[]>([])
	const [evidence, setEvidence] = useState<Evidence[]>([])
	const [people, setPeople] = useState<Person[]>([])
	const [themes, setThemes] = useState<Theme[]>([])
	const [loading, setLoading] = useState(false)

	const fetchData = async () => {
		setLoading(true)
		try {
			const [c, p, civ, e, ev, pe, t] = await Promise.all([
				api.get('public/courses').json<Course[]>(),
				api.get('admin/periods/all').json<Period[]>(),
				api.get('admin/civilizations/all').json<Civilization[]>(),
				api.get('admin/events/all').json<Event[]>(),
				api.get('admin/evidence/all').json<Evidence[]>(),
				api.get('admin/people/all').json<Person[]>(),
				api.get('public/themes').json<Theme[]>()
			])
			setCourses(c)
			setPeriods(p)
			setCivilizations(civ)
			setEvents(e)
			setEvidence(ev)
			setPeople(pe)
			setThemes(t)
		} catch (err) {
			console.error(err)
			alert('Failed to load data')
		}
		setLoading(false)
	}

	useEffect(() => { fetchData() }, [])

	const handleDelete = async (type: string, id: number) => {
		if (!confirm(`Delete this ${type.slice(0, -1)}?`)) return
		try {
			await api.delete(`admin/${type}/${id}`)
			fetchData()
		} catch (err) {
			alert('Delete failed')
		}
	}

	const renderTable = () => {
		if (loading) return <p>Loading...</p>

		switch (activeTab) {
			case 'courses':
				return (
					<table className="admin-table">
						<thead>
							<tr><th>ID</th><th>Name</th><th>Description</th><th>Actions</th></tr>
						</thead>
						<tbody>
							{courses.map(c => (
								<tr key={c.id}>
									<td>{c.id}</td>
									<td>{c.name}</td>
									<td>{c.description}</td>
									<td><button className="btn btn-danger" onClick={() => handleDelete('courses', c.id)}>Delete</button></td>
								</tr>
							))}
						</tbody>
					</table>
				)
			case 'periods':
				return (
					<table className="admin-table">
						<thead>
							<tr><th>ID</th><th>Title</th><th>Years</th><th>Course ID</th><th>Actions</th></tr>
						</thead>
						<tbody>
							{periods.map(p => (
								<tr key={p.id}>
									<td>{p.id}</td>
									<td>{p.title}</td>
									<td>{p.startYear}–{p.endYear}</td>
									<td>{p.course?.id}</td>
									<td><button className="btn btn-danger" onClick={() => handleDelete('periods', p.id)}>Delete</button></td>
								</tr>
							))}
						</tbody>
					</table>
				)
			case 'civilizations':
				return (
					<table className="admin-table">
						<thead>
							<tr><th>ID</th><th>Name</th><th>Years</th><th>Period ID</th><th>Actions</th></tr>
						</thead>
						<tbody>
							{civilizations.map(c => (
								<tr key={c.id}>
									<td>{c.id}</td>
									<td>{c.name}</td>
									<td>{c.startYear}–{c.endYear}</td>
									<td>{c.period?.id}</td>
									<td><button className="btn btn-danger" onClick={() => handleDelete('civilizations', c.id)}>Delete</button></td>
								</tr>
							))}
						</tbody>
					</table>
				)
			case 'events':
				return (
					<table className="admin-table">
						<thead>
							<tr><th>ID</th><th>Name</th><th>Year</th><th>Period/Civ</th><th>Actions</th></tr>
						</thead>
						<tbody>
							{events.map(e => (
								<tr key={e.id}>
									<td>{e.id}</td>
									<td>{e.name}</td>
									<td>{e.year}</td>
									<td>{e.period?.id || e.civilization?.id || '—'}</td>
									<td><button className="btn btn-danger" onClick={() => handleDelete('events', e.id)}>Delete</button></td>
								</tr>
							))}
						</tbody>
					</table>
				)
			case 'evidence':
				return (
					<table className="admin-table">
						<thead>
							<tr><th>ID</th><th>Title</th><th>Type</th><th>Theme ID</th><th>Civilization ID</th><th>Actions</th></tr>
						</thead>
						<tbody>
							{evidence.map(e => (
								<tr key={e.id}>
									<td>{e.id}</td>
									<td>{e.title}</td>
									<td>{e.type}</td>
									<td>{e.theme?.id}</td>
									<td>{e.civilization?.id}</td>
									<td><button className="btn btn-danger" onClick={() => handleDelete('evidence', e.id)}>Delete</button></td>
								</tr>
							))}
						</tbody>
					</table>
				)
			case 'people':
				return (
					<table className="admin-table">
						<thead>
							<tr><th>ID</th><th>Name</th><th>Birth–Death</th><th>Civilization ID</th><th>Actions</th></tr>
						</thead>
						<tbody>
							{people.map(p => (
								<tr key={p.id}>
									<td>{p.id}</td>
									<td>{p.name}</td>
									<td>{p.birthYear}–{p.deathYear}</td>
									<td>{p.civilization?.id}</td>
									<td><button className="btn btn-danger" onClick={() => handleDelete('people', p.id)}>Delete</button></td>
								</tr>
							))}
						</tbody>
					</table>
				)
			case 'themes':
				return (
					<table className="admin-table">
						<thead>
							<tr><th>ID</th><th>Name</th><th>Description</th><th>Actions</th></tr>
						</thead>
						<tbody>
							{themes.map(t => (
								<tr key={t.id}>
									<td>{t.id}</td>
									<td>{t.name}</td>
									<td>{t.description}</td>
									<td><button className="btn btn-danger" onClick={() => handleDelete('themes', t.id)}>Delete</button></td>
								</tr>
							))}
						</tbody>
					</table>
				)
			default:
				return null
		}
	}

	return (
		<div className="admin-dashboard-full">
			<h1 className="admin-title">Admin Dashboard</h1>
			<div className="admin-tabs">
				{['courses', 'periods', 'civilizations', 'events', 'evidence', 'people', 'themes'].map(tab => (
					<button
						key={tab}
						className={`admin-tab ${activeTab === tab ? 'active' : ''}`}
						onClick={() => setActiveTab(tab as TabType)}
					>
						{tab.charAt(0).toUpperCase() + tab.slice(1)}
					</button>
				))}
			</div>
			<div className="admin-tab-content">
				{renderTable()}
			</div>
		</div>
	)
}