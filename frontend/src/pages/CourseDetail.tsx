import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../services/api'
import './CourseDetail.css'

interface Period {
	id: number
	title: string
	startYear: number
	endYear: number
	overview: string
}

export default function CourseDetail() {
	const { courseId } = useParams<{ courseId: string }>()
	const [periods, setPeriods] = useState<Period[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')

	useEffect(() => {
		api.get(`public/courses/${courseId}/periods`)
			.json<Period[]>()
			.then(setPeriods)
			.catch(() => setError('Failed to load periods'))
			.finally(() => setLoading(false))
	}, [courseId])

	if (loading) return <div className="container">Loading periods...</div>
	if (error) return <div className="container error-alert">{error}</div>

	return (
		<div className="container">
			<Link to="/" className="back-link">← Back to Courses</Link>
			<h2 className="periods-title">Historical Periods</h2>
			<div className="periods-list">
				{periods.map((period) => (
					<div key={period.id} className="period-card">
						<h3 className="period-title">{period.title}</h3>
						<p className="period-years">{period.startYear} – {period.endYear}</p>
						<p className="period-overview">{period.overview}</p>
						<Link to={`/periods/${period.id}/events`} className="btn btn-secondary period-link">
							View Events →
						</Link>
					</div>
				))}
				{periods.length === 0 && (
					<p className="text-secondary">No periods available for this course.</p>
				)}
			</div>
		</div>
	)
}