export interface DataPoint {
    time: number;
    allowed: number;
    rejected: number;
}

export interface ThroughputGraphProps {
    data: DataPoint[];
}