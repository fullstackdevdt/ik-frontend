import { createSelector } from '@ngrx/store';
import { dashboardFeature } from './dashboard.reducer';

export const {
  selectChartData,
  selectMetadata,
  selectLoading,
  selectError,
  selectFileId,
} = dashboardFeature;

export const selectHasChart = createSelector(
  selectChartData,
  (chartData) => chartData !== null
);

// export const selectDashboardViewModel = createSelector(
//   selectChartData,
//   selectMetadata,
//   selectLoading,
//   selectError,
//   selectFileId,
//   (chartData, metadata, loading, error, fileId) => ({
//     chartData,
//     metadata,
//     loading,
//     error,
//     fileId,
//   })
// );

export const selectDashboardViewModel = createSelector(
  selectChartData,
  selectMetadata,
  selectLoading,
  selectError,
  selectFileId,
  (chartData, metadata, loading, error, fileId: string | null) => ({
    chartData,
    metadata,
    loading,
    error,
    fileId,
  })
);