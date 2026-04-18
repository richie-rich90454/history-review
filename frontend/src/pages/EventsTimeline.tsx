import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
	ReactFlow,
	Background,
	Controls,
	MiniMap,
	useNodesState,
	useEdgesState,
	Panel,
	type Node,
	type Edge,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import dagre from 'dagre'
import api from '../services/api'

interface Event {
	id: number
	name: string
	year: number
	description: string
	significance: string
}

const dagreGraph = new dagre.graphlib.Graph()
dagreGraph.setDefaultEdgeLabel(() => ({}))

const nodeWidth = 220
const nodeHeight = 120

const getLayoutedElements = (events: Event[], direction = 'LR') => {
	if (events.length === 0) return { nodes: [], edges: [] }

	dagreGraph.setGraph({
		rankdir: direction,
		nodesep: 80,
		ranksep: 150,
		marginx: 50,
		marginy: 50,
	})

	const sortedEvents = [...events].sort((a, b) => a.year - b.year)
	const centerEvent = sortedEvents[Math.floor(sortedEvents.length / 2)]
	const rootId = `event-${centerEvent.id}`

	dagreGraph.setNode(rootId, { width: nodeWidth, height: nodeHeight })

	sortedEvents.forEach((event) => {
		const nodeId = `event-${event.id}`
		if (nodeId !== rootId) {
			dagreGraph.setNode(nodeId, { width: nodeWidth, height: nodeHeight })
			dagreGraph.setEdge(rootId, nodeId)
		}
	})

	dagre.layout(dagreGraph)

	const nodes: Node[] = sortedEvents.map((event) => {
		const nodeId = `event-${event.id}`
		const nodeWithPosition = dagreGraph.node(nodeId)
		return {
			id: nodeId,
			type: 'customEvent',
			position: { x: nodeWithPosition.x - nodeWidth / 2, y: nodeWithPosition.y - nodeHeight / 2 },
			data: { event },
		}
	})

	const edges: Edge[] = dagreGraph.edges().map((edge) => ({
		id: `edge-${edge.v}-${edge.w}`,
		source: edge.v,
		target: edge.w,
		type: 'smoothstep',
		animated: true,
		style: { stroke: '#524765', strokeWidth: 2 },
	}))

	return { nodes, edges }
}

const EventNode = ({ data }: { data: { event: Event } }) => {
	const { event } = data
	return (
		<div
			style={{
				background: '#ffffff',
				border: '2px solid #524765',
				borderRadius: '8px',
				padding: '12px',
				width: '100%',
				height: '100%',
				boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
				fontFamily: '"Noto Sans", sans-serif',
			}}
		>
			<div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#0f1115', marginBottom: '4px' }}>
				{event.name}
			</div>
			<div style={{ fontSize: '0.85rem', color: '#524765', fontWeight: 600, marginBottom: '6px' }}>
				{event.year}
			</div>
			<div style={{ fontSize: '0.75rem', color: '#4b5563', lineHeight: 1.4 }}>
				{event.description.length > 120
					? event.description.substring(0, 120) + '...'
					: event.description}
			</div>
			{event.significance && (
				<div style={{ fontSize: '0.7rem', color: '#5e1414', marginTop: '6px', fontStyle: 'italic' }}>
					{event.significance.substring(0, 80)}
					{event.significance.length > 80 && '...'}
				</div>
			)}
		</div>
	)
}

const nodeTypes = {
	customEvent: EventNode,
}

export default function EventsTimeline() {
	const { periodId } = useParams<{ periodId: string }>()
	const [events, setEvents] = useState<Event[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')
	const [nodes, setNodes, onNodesChange] = useNodesState<Node>([])
	const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([])

	useEffect(() => {
		api
			.get(`public/periods/${periodId}/events`)
			.json<Event[]>()
			.then((data) => {
				setEvents(data)
				const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(data)
				setNodes(layoutedNodes)
				setEdges(layoutedEdges)
			})
			.catch(() => setError('Failed to load events'))
			.finally(() => setLoading(false))
	}, [periodId, setNodes, setEdges])

	const handleResetLayout = () => {
		const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(events)
		setNodes(layoutedNodes)
		setEdges(layoutedEdges)
	}

	if (loading) {
		return <div className="container">Loading mindmap...</div>
	}

	if (error) {
		return <div className="container error-alert">{error}</div>
	}

	return (
		<div className="container" style={{ height: 'calc(100vh - 100px)', marginTop: '1rem' }}>
			<Link to={`/courses/${periodId}`} className="back-link">← Back to Periods</Link>
			<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
				<h2 className="events-title">Interactive History Mindmap</h2>
			</div>
			<div style={{ width: '100%', height: '100%', border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
				<ReactFlow
					nodes={nodes}
					edges={edges}
					onNodesChange={onNodesChange}
					onEdgesChange={onEdgesChange}
					nodeTypes={nodeTypes}
					fitView
					fitViewOptions={{ padding: 0.2 }}
					proOptions={{ hideAttribution: true }}
					minZoom={0.1}
					maxZoom={2}
				>
					<Background color="#e0dce8" gap={16} />
					<Controls />
					<MiniMap
						nodeColor={() => '#524765'}
						nodeStrokeWidth={2}
						maskColor="rgba(15, 17, 21, 0.1)"
						style={{ backgroundColor: '#f5f3f7' }}
					/>
					<Panel position="top-right">
						<button
							onClick={handleResetLayout}
							style={{
								background: '#524765',
								color: 'white',
								border: 'none',
								borderRadius: '4px',
								padding: '8px 16px',
								cursor: 'pointer',
								fontWeight: 500,
							}}
						>
							Reset Layout
						</button>
					</Panel>
				</ReactFlow>
			</div>
		</div>
	)
}