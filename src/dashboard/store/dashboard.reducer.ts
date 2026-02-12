import { createFeature, createReducer, on } from '@ngrx/store';
import { DashboardActions } from './dashboard.actions';
import { initialDashboardState } from '../models/dashboard.models';

export const dashboardFeature = createFeature({
  name: 'dashboard',
  reducer: createReducer(
    initialDashboardState,

    on(DashboardActions.loadChart, (state, { fileId }) => ({
      ...state,
      fileId,
      loading: true,
      error: null,
    })),

    on(DashboardActions.loadChartSuccess, (state, { chartData, metadata }) => ({
      ...state,
      chartData,
      metadata,
      loading: false,
    })),

    on(DashboardActions.loadChartFailure, (state, { error }) => ({
      ...state,
      error,
      loading: false,
    })),

    on(DashboardActions.reset, () => initialDashboardState)
  ),
});