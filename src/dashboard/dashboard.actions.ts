import { createAction, props } from '@ngrx/store';

export interface HistoricalDataPoint {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface HistoricalData {
  id: string;
  symbol: string;
  duration: string;
  bar_size: string;
  data_points: number;
  created_at: string;
  data: HistoricalDataPoint[];
}

export const loadHistoricalData = createAction(
  '[Dashboard] Load Historical Data',
  props<{ fileId: string }>()
);

export const loadHistoricalDataSuccess = createAction(
  '[Dashboard] Load Historical Data Success',
  props<{ data: HistoricalData }>()
);

export const loadHistoricalDataFailure = createAction(
  '[Dashboard] Load Historical Data Failure',
  props<{ error: string }>()
);
