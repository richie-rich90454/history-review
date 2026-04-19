import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Chrono } from 'react-chrono';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@radix-ui/react-hover-card';
import { Popover, PopoverTrigger, PopoverContent } from '@radix-ui/react-popover';
import * as Dialog from '@radix-ui/react-dialog';
import { useMediaQuery } from 'react-responsive';
import 'react-chrono/dist/style.css';
import api from '../services/api';
import './EventsTimeline.css';

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
    courseId?: number;
}

const EventsTimeline = () => {
    const { periodId } = useParams<{ periodId: string }>();
    const [events, setEvents] = useState<TimelineEvent[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    useEffect(() => {
        api.get(`public/periods/${periodId}/timeline`)
            .json<TimelineEvent[]>()
            .then(setEvents)
            .catch(() => setError('Failed to load timeline events'))
            .finally(() => setLoading(false));
    }, [periodId]);

    const courseId = events.length > 0 ? events[0].courseId : null;

    const items = events.map(event => {
        const civName = event.civilization?.name || 'Unknown';
        const peopleList = event.people || [];

        let subtitle = `Civilization: ${civName}`;
        if (peopleList.length > 0) {
            subtitle += ` | People: ${peopleList.map(p => p.name).join(', ')}`;
        }

        return {
            title: event.year.toString(),
            cardTitle: event.name,
            cardSubtitle: subtitle,
            timelineContent: (
                <div className="timeline-card-content">
                    <p className="card-description"><strong>Description:</strong> {event.description}</p>
                    {event.significance && (
                        <p className="card-significance"><strong>Significance:</strong> {event.significance}</p>
                    )}
                    {event.civilization && (
                        <div className="card-civilization">
                            <strong>{event.civilization.name} ({event.civilization.startYear}–{event.civilization.endYear})</strong>
                            <p>{event.civilization.overview}</p>
                        </div>
                    )}
                    {peopleList.length > 0 && (
                        <div className="card-people">
                            <strong>People {isMobile && '(tap for details)'}:</strong>
                            <ul>
                                {peopleList.map(p => {
                                    const triggerContent = (
                                        <span className="person-trigger">
                                            {p.name} ({p.birthYear || '?'}–{p.deathYear || '?'})
                                        </span>
                                    );
                                    const popoverContent = (
                                        <div className="person-popup">
                                            <h4>{p.name}</h4>
                                            <p className="person-years">{p.birthYear || '?'} – {p.deathYear || '?'}</p>
                                            <p className="person-bio">{p.biography || 'No biography available.'}</p>
                                        </div>
                                    );
                                    return (
                                        <li key={p.id}>
                                            {isMobile ? (
                                                <Popover>
                                                    <PopoverTrigger asChild>{triggerContent}</PopoverTrigger>
                                                    <PopoverContent className="popover-content" sideOffset={5}>
                                                        {popoverContent}
                                                    </PopoverContent>
                                                </Popover>
                                            ) : (
                                                <HoverCard openDelay={200} closeDelay={100}>
                                                    <HoverCardTrigger asChild>{triggerContent}</HoverCardTrigger>
                                                    <HoverCardContent className="hover-card-content" sideOffset={5}>
                                                        {popoverContent}
                                                    </HoverCardContent>
                                                </HoverCard>
                                            )}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    )}
                    {event.evidence && event.evidence.length > 0 ? (
                        <div className="card-evidence">
                            <Dialog.Root>
                                <Dialog.Trigger asChild>
                                    <button className="evidence-btn" type="button">
                                        <span className="evidence-icon">📋</span>
                                        VIEW EVIDENCE ({event.evidence.length})
                                    </button>
                                </Dialog.Trigger>
                                <Dialog.Portal>
                                    <Dialog.Overlay className="dialog-overlay" />
                                    <Dialog.Content className="dialog-content">
                                        <Dialog.Title className="dialog-title">Related Evidence</Dialog.Title>
                                        <div className="evidence-table-wrapper">
                                            <table className="evidence-table">
                                                <thead>
                                                    <tr>
                                                        <th>Title</th>
                                                        <th>Type</th>
                                                        <th>Theme</th>
                                                        <th>Description</th>
                                                        <th>Source</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {event.evidence!.map(e => (
                                                        <tr key={e.id}>
                                                            <td><strong>{e.title}</strong></td>
                                                            <td>{e.type || '—'}</td>
                                                            <td>{e.theme?.name || '—'}</td>
                                                            <td>{e.description}</td>
                                                            <td>{e.source || '—'}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                        <Dialog.Close asChild>
                                            <button className="dialog-close-btn">Close</button>
                                        </Dialog.Close>
                                    </Dialog.Content>
                                </Dialog.Portal>
                            </Dialog.Root>
                        </div>
                    ) : (
                        <div className="no-evidence-message">
                            <span>📭 No evidence available for this event.</span>
                        </div>
                    )}
                </div>
            ),
        };
    });

    if (loading) return <div className="container">Loading timeline...</div>;
    if (error) return <div className="container error-alert">{error}</div>;

    return (
        <div className="events-page container">
            <Link to={courseId ? `/courses/${courseId}` : '/'} className="back-link">
                ← Back to Course
            </Link>
            <h2 className="events-title">Historical Timeline</h2>
            <div className="timeline-wrapper">
                <Chrono
                    items={items}
                    mode={isMobile ? 'VERTICAL' : 'VERTICAL_ALTERNATING'}
                    theme={{
                        primary: '#524765',
                        secondary: '#f5f3f7',
                        cardBgColor: '#ffffff',
                        titleColor: '#0f1115',
                        titleColorActive: '#524765',
                    }}
                    cardWidth={isMobile ? window.innerWidth - 40 : 550}
                    cardHeight="auto"
                    fontSizes={{
                        cardTitle: '1.25rem',
                        cardSubtitle: '0.9rem',
                        cardText: '0.95rem',
                        title: '1rem',
                    }}
                />
            </div>
        </div>
    );
};

export default EventsTimeline;