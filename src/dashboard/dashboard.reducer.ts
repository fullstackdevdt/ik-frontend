import { createReducer, on } from '@ngrx/store';
import {
  HistoricalData,
  loadHistoricalData,
  loadHistoricalDataSuccess,
  loadHistoricalDataFailure,
} from './dashboard.actions';

export interface DashboardState {
  historicalData: HistoricalData | null;
  loading: boolean;
  error: string | null;
}

export const initialState: DashboardState = {
  historicalData: null,
  loading: false,
  error: null,
};

export const dashboardReducer = createReducer(
  initialState,
  on(loadHistoricalData, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(loadHistoricalDataSuccess, (state, { data }) => ({
    ...state,
    historicalData: data,
    loading: false,
    error: null,
  })),
  on(loadHistoricalDataFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
