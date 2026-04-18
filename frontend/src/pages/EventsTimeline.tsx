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
	people?: Person[];
}

interface Person {
	id: number;
	name: string;
	birthYear?: number;
	deathYear?: number;
	biography?: string;
}

interface Evidence {
	id: number;
	title: string;
	description: string;
	type?: string;
	source?: string;
}

interface Event {
	id: number;
	name: string;
	year: number;
	description: string;
	significance?: string;
	civilization?: Civilization;
	evidence?: Evidence[];
}

const EventsTimeline = () => {
	const { periodId } = useParams<{ periodId: string }>();
	const [events, setEvents] = useState<Event[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		api.get(`public/periods/${periodId}/events`)
			.json<Event[]>()
			.then(setEvents)
			.catch(() => setError("Failed to load timeline events"))
			.finally(() => setLoading(false));
	}, [periodId]);

	const timelineItems = events.map((event) => {
		const peopleList = event.civilization?.people || [];
		let cardSubtitle = `Civilization: ${event.civilization?.name || "Unknown"}`;
		if (peopleList.length > 0) {
			cardSubtitle += ` | Figures: ${peopleList.map((p) => p.name).join(", ")}`;
		}

		let detailedText = `<p><strong>Description:</strong> ${event.description}</p>`;
		if (event.significance) {
			detailedText += `<p><strong>Significance:</strong> ${event.significance}</p>`;
		}
		if (event.civilization?.overview) {
			detailedText += `<p><strong>About ${event.civilization.name}:</strong> ${event.civilization.overview}</p>`;
		}
		if (event.evidence && event.evidence.length > 0) {
			let evidenceHtml = "<p><strong>Related Evidence:</strong><ul>";
			event.evidence.forEach((e) => {
				evidenceHtml += `<li><strong>${e.title}</strong> (${e.type || "N/A"}): ${e.description}</li>`;
			});
			evidenceHtml += "</ul></p>";
			detailedText += evidenceHtml;
		}

		return {
			title: event.year.toString(),
			cardTitle: event.name,
			cardSubtitle: cardSubtitle,
			cardText: detailedText,
		};
	});

	if (loading) {
		return <div className="container">Loading interactive timeline...</div>;
	}

	if (error) {
		return <div className="container error-alert">{error}</div>;
	}

	return (
		<div className="events-page container">
			<Link to={`/courses/${periodId}`} className="back-link">
				← Back to Periods
			</Link>
			<h2 className="events-title">Historical Timeline</h2>
			<div className="timeline-wrapper">
				<Chrono
					items={timelineItems}
					mode="VERTICAL_ALTERNATING"
					theme={{
						primary: "#524765",
						secondary: "#f5f3f7",
						cardBgColor: "#ffffff",
						titleColor: "#0f1115",
						titleColorActive: "#524765",
					}}
					cardWidth={500}
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
