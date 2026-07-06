export interface Course {
    id: number;
    name: string;
    description: string;
}

export interface Period {
    id: number;
    title: string;
    startYear: number;
    endYear: number;
    overview: string;
    course?: { id: number };
}

export interface Civilization {
    id: number;
    name: string;
    overview: string;
    startYear: number;
    endYear: number;
    period?: { id: number };
}

export interface HistoricalEvent {
    id: number;
    name: string;
    year: number;
    description: string;
    significance: string;
    period?: { id: number };
    civilization?: { id: number };
}

export interface Person {
    id: number;
    name: string;
    birthYear: number;
    deathYear: number;
    biography: string;
    civilization?: { id: number };
}

export interface Evidence {
    id: number;
    title: string;
    description: string;
    type: string;
    source: string;
    significance: string;
    civilization?: { id: number };
    theme?: { id: number };
}

export interface Theme {
    id: number;
    name: string;
    description: string;
}
