import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
import './SubmitContent.css'

interface Course {
	id: number
	name: string
}

interface Period {
	id: number
	title: string
}

interface Theme {
	id: number
	name: string
}

export default function SubmitContent() {
	const [courses, setCourses] = useState<Course[]>([])
	const [periods, setPeriods] = useState<Period[]>([])
	const [themes, setThemes] = useState<Theme[]>([])
	const [selectedCourse, setSelectedCourse] = useState<number | ''>('')
	const [selectedPeriod, setSelectedPeriod] = useState<number | ''>('')
	const [contentType, setContentType] = useState('civilization')
	const [formData, setFormData] = useState<any>({})
	const [message, setMessage] = useState('')
	const navigate = useNavigate()

	useEffect(() => {
		api.get('public/courses').json<Course[]>().then(setCourses)
		api.get('public/themes').json<Theme[]>().then(setThemes)
	}, [])

	useEffect(() => {
		if (selectedCourse) {
			api.get(`public/courses/${selectedCourse}/periods`).json<Period[]>().then(setPeriods)
		} else {
			setPeriods([])
		}
	}, [selectedCourse])

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		const payload: any = { ...formData }
		if (selectedPeriod) {
			payload.period = { id: selectedPeriod }
		}
		if (contentType === 'evidence' && formData.themeId) {
			payload.theme = { id: formData.themeId }
		}
		try {
			let endpoint = ''
			if (contentType === 'civilization') endpoint = 'admin/civilizations'
			else if (contentType === 'event') endpoint = 'admin/events'
			else if (contentType === 'evidence') endpoint = 'evidence/admin'
			else if (contentType === 'person') endpoint = 'admin/people'
			await api.post(endpoint, { json: payload })
			setMessage('Submitted for approval!')
			setTimeout(() => navigate('/'), 1500)
		} catch (err) {
			setMessage('Submission failed')
		}
	}

	return (
		<div className="container submit-container">
			<h2 className="submit-title">Submit New Content</h2>
			{message && <div className="message">{message}</div>}
			<form onSubmit={handleSubmit} className="submit-form">
				<div className="form-group">
					<label>Course</label>
					<select value={selectedCourse} onChange={e => setSelectedCourse(Number(e.target.value))} required>
						<option value="">Select a course</option>
						{courses.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
					</select>
				</div>
				<div className="form-group">
					<label>Period</label>
					<select value={selectedPeriod} onChange={e => setSelectedPeriod(Number(e.target.value))} required>
						<option value="">Select a period</option>
						{periods.map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
					</select>
				</div>
				<div className="form-group">
					<label>Content Type</label>
					<select value={contentType} onChange={e => setContentType(e.target.value)}>
						<option value="civilization">Civilization</option>
						<option value="event">Event</option>
						<option value="evidence">Evidence (SPICE-T)</option>
						<option value="person">Person</option>
					</select>
				</div>
				{contentType === 'civilization' && (
					<>
						<input type="text" placeholder="Name" onChange={e => setFormData({...formData, name: e.target.value})} required />
						<textarea placeholder="Overview" onChange={e => setFormData({...formData, overview: e.target.value})} />
						<input type="number" placeholder="Start Year" onChange={e => setFormData({...formData, startYear: parseInt(e.target.value)})} />
						<input type="number" placeholder="End Year" onChange={e => setFormData({...formData, endYear: parseInt(e.target.value)})} />
					</>
				)}
				{contentType === 'event' && (
					<>
						<input type="text" placeholder="Event Name" onChange={e => setFormData({...formData, name: e.target.value})} required />
						<input type="number" placeholder="Year" onChange={e => setFormData({...formData, year: parseInt(e.target.value)})} />
						<textarea placeholder="Description" onChange={e => setFormData({...formData, description: e.target.value})} />
						<input type="text" placeholder="Significance" onChange={e => setFormData({...formData, significance: e.target.value})} />
					</>
				)}
				{contentType === 'evidence' && (
					<>
						<input type="text" placeholder="Title" onChange={e => setFormData({...formData, title: e.target.value})} required />
						<textarea placeholder="Description" onChange={e => setFormData({...formData, description: e.target.value})} />
						<select onChange={e => setFormData({...formData, themeId: e.target.value})} required>
							<option value="">Select Theme</option>
							{themes.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
						</select>
						<input type="text" placeholder="Type (e.g., LEQ)" onChange={e => setFormData({...formData, type: e.target.value})} />
						<input type="text" placeholder="Source" onChange={e => setFormData({...formData, source: e.target.value})} />
					</>
				)}
				{contentType === 'person' && (
					<>
						<input type="text" placeholder="Name" onChange={e => setFormData({...formData, name: e.target.value})} required />
						<input type="number" placeholder="Birth Year" onChange={e => setFormData({...formData, birthYear: parseInt(e.target.value)})} />
						<input type="number" placeholder="Death Year" onChange={e => setFormData({...formData, deathYear: parseInt(e.target.value)})} />
						<textarea placeholder="Biography" onChange={e => setFormData({...formData, biography: e.target.value})} />
					</>
				)}
				<button type="submit" className="btn btn-primary">Submit for Approval</button>
			</form>
		</div>
	)
}