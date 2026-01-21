import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DashboardState } from './dashboard.reducer';

export const selectDashboardState = createFeatureSelector<DashboardState>('dashboard');

export const selectHistoricalData = createSelector(
  selectDashboardState,
  (state) => state.historicalData
);

export const selectHistoricalDataPoints = createSelector(
  selectHistoricalData,
  (data) => data?.data ?? []
);

export const selectLoading = createSelector(
  selectDashboardState,
  (state) => state.loading
);

export const selectError = createSelector(
  selectDashboardState,
  (state) => state.error
);
