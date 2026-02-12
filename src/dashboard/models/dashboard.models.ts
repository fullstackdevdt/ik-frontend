/** Raw bar from the API */
export interface HistoricalBar {
  readonly date: string;
  readonly open: number;
  readonly high: number;
  readonly low: number;
  readonly close: number;
  readonly volume: number;
}

export interface ChartDataset {
  readonly label: string;
  readonly data: number[];
}

export interface ChartData {
  readonly labels: string[];
  readonly datasets: ChartDataset[];
}

/** Metadata from the API response */
export interface ChartMetadata {
  readonly id: string;
  readonly symbol: string;
  readonly duration: string;
  readonly barSize: string;
  readonly dataPoints: number;
  readonly createdAt: string;
}

export interface DashboardState {
  readonly chartData: ChartData | null;
  readonly metadata: ChartMetadata | null;
  readonly loading: boolean;
  readonly error: string | null;
  readonly fileId: string | null;
}

export const initialDashboardState: DashboardState = {
  chartData: null,
  metadata: null,
  loading: false,
  error: null,
  fileId: null,
};