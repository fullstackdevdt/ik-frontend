import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ChartData, ChartMetadata } from '../models/dashboard.models';

export const DashboardActions = createActionGroup({
  source: 'Dashboard',
  events: {
    'Load Chart': props<{ fileId: string }>(),
    'Load Chart Success': props<{ chartData: ChartData; metadata: ChartMetadata }>(),
    'Load Chart Failure': props<{ error: string }>(),
    'Reset': emptyProps(),
  },
});