import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Chrono } from "react-chrono";
import "react-chrono/dist/style.css";
import api from "../services/api";
import "./EventsTimeline.css";

interface Civilization {
	id: number;
	name: string;
	overview: string;
	startYear: number;
	endYear: number;
}

interface Person {
	id: number;
	name: string;
	birthYear?: number;
	deathYear?: number;
	biography?: string;
}

interface Theme {
	id: number;
	name: string;
}

interface Evidence {
	id: number;
	title: string;
	description: string;
	type?: string;
	source?: string;
	theme?: Theme;
}

interface TimelineEvent {
	id: number;
	name: string;
	year: number;
	description: string;
	significance?: string;
	civilization?: Civilization;
	people?: Person[];
	evidence?: Evidence[];
}

const EventsTimeline = () => {
	const { periodId } = useParams<{ periodId: string }>();
	const [events, setEvents] = useState<TimelineEvent[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		api.get(`public/periods/${periodId}/timeline`)
			.json<TimelineEvent[]>()
			.then(setEvents)
			.catch(() => setError("Failed to load timeline events"))
			.finally(() => setLoading(false));
	}, [periodId]);

	const items = events.map((event) => {
		const civName = event.civilization?.name || "Unknown";
		const peopleList = event.people || [];

		let subtitle = `Civilization: ${civName}`;
		if (peopleList.length > 0) {
			subtitle += ` | People: ${peopleList.map((p) => p.name).join(", ")}`;
		}

		// Build the detailed HTML with hover tooltips
		let detailsHtml = `<div style="margin-bottom:8px;"><strong>Description:</strong> ${event.description}</div>`;
		if (event.significance) {
			detailsHtml += `<div style="margin-bottom:8px;"><strong>Significance:</strong> ${event.significance}</div>`;
		}
		if (event.civilization) {
			detailsHtml += `<div style="margin-bottom:8px;"><strong>Civilization: ${event.civilization.name} (${event.civilization.startYear}-${event.civilization.endYear})</strong><br>${event.civilization.overview}</div>`;
		}
		if (peopleList.length > 0) {
			detailsHtml += `<div style="margin-bottom:8px;"><strong>People:</strong><ul style="margin:4px 0 0 16px;">`;
			peopleList.forEach((p) => {
				const tooltipText = `${p.name} (${p.birthYear || "?"}-${p.deathYear || "?"}): ${p.biography || "No biography available"}`;
				detailsHtml += `<li class="person-item" data-tooltip="${tooltipText.replace(/"/g, "&quot;")}"><strong>${p.name}</strong> (${p.birthYear || "?"}-${p.deathYear || "?"})</li>`;
			});
			detailsHtml += `</ul></div>`;
		}
		if (event.evidence && event.evidence.length > 0) {
			detailsHtml += `<div style="margin-bottom:8px;"><strong>Evidence:</strong><ul style="margin:4px 0 0 16px;">`;
			event.evidence.forEach((e) => {
				const evidenceTooltip = `${e.title} [${e.type || "N/A"}] | Theme: ${e.theme?.name || "Unknown"} | Source: ${e.source || "N/A"}`;
				detailsHtml += `<li class="evidence-item" data-tooltip="${evidenceTooltip.replace(/"/g, "&quot;")}"><strong>${e.title}</strong> [${e.type || "N/A"}] (Theme: ${e.theme?.name || "Unknown"})</li>`;
			});
			detailsHtml += `</ul></div>`;
		}

		return {
			title: event.year.toString(),
			cardTitle: event.name,
			cardSubtitle: subtitle,
			cardDetailedText: detailsHtml,
		};
	});

	if (loading) return <div className="container">Loading timeline...</div>;
	if (error) return <div className="container error-alert">{error}</div>;

	return (
		<div className="events-page container">
			<Link to={`/courses/${periodId}`} className="back-link">
				← Back to Periods
			</Link>
			<h2 className="events-title">Historical Timeline</h2>
			<div className="timeline-wrapper">
				<Chrono
					items={items}
					mode="VERTICAL_ALTERNATING"
					parseDetailsAsHTML={true}
					theme={{
						primary: "#524765",
						secondary: "#f5f3f7",
						cardBgColor: "#ffffff",
						titleColor: "#0f1115",
						titleColorActive: "#524765",
					}}
					cardWidth={550}
					cardHeight="auto"
					fontSizes={{
						cardTitle: "1.25rem",
						cardSubtitle: "0.9rem",
						cardText: "0.95rem",
						title: "1rem",
					}}
				/>
			</div>
		</div>
	);
};

export default EventsTimeline;
