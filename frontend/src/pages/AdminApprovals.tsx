import { useEffect, useState } from 'react'
import api from '../services/api'
import './AdminApprovals.css'

interface PendingItem {
	type: string
	id: number
	title: string
	data: any
}

export default function AdminApprovals() {
	const [items, setItems] = useState<PendingItem[]>([])
	const [loading, setLoading] = useState(true)

	const fetchPending = async () => {
		const res = await api.get('admin/approvals/pending').json<PendingItem[]>()
		setItems(res)
		setLoading(false)
	}

	useEffect(() => { fetchPending() }, [])

	const handleApprove = async (type: string, id: number) => {
		await api.post(`admin/approvals/${type}/${id}/approve`)
		fetchPending()
	}

	const handleReject = async (type: string, id: number) => {
		await api.post(`admin/approvals/${type}/${id}/reject`)
		fetchPending()
	}

	if (loading) return <div className="container">Loading...</div>

	return (
		<div className="container admin-approvals">
			<h2 className="approvals-title">Pending Approvals</h2>
			{items.length === 0 && <p>No pending items.</p>}
			<div className="approvals-list">
				{items.map(item => (
					<div key={`${item.type}-${item.id}`} className="approval-card">
						<div className="approval-header">
							<span className="approval-type">{item.type}</span>
							<span className="approval-title">{item.title}</span>
						</div>
						<pre className="approval-data">{JSON.stringify(item.data, null, 2)}</pre>
						<div className="approval-actions">
							<button className="btn btn-success" onClick={() => handleApprove(item.type, item.id)}>Approve</button>
							<button className="btn btn-danger" onClick={() => handleReject(item.type, item.id)}>Reject</button>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}